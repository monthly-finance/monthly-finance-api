import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IncomeReport } from './entities/income-report.entity';
import {
  CreateIncomeReportInput,
  DeleteIncomeReportInput,
  FindOneIncomeReportInput,
  InsertIncomeReportInput,
  UpdateIncomeReportInput,
} from './dtos/income.input.dto';
import { EntityNotFoundException } from 'src/shared/types/types';
import { User } from 'src/user/entities/user.entity';
import { EmployeeBenefitService } from './employee-benefit.service';
import { OtherIncomeService } from './other-income.service';
import { PaycheckService } from './paycheck.service';
import { BulkOperationOutput } from 'src/shared/dto/common.dto';
import { evaluateSettledPromises } from 'src/shared/utils';

@Injectable()
export class IncomeReportService {
  constructor(
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly employeeBenefitService: EmployeeBenefitService,
    private readonly otherIncomeService: OtherIncomeService,
    private readonly paycheckService: PaycheckService,
  ) {}

  async create(
    userId: string,
    createIncomeReport: CreateIncomeReportInput,
  ): Promise<IncomeReport> {
    const { forMonth, forYear } = createIncomeReport;
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    const existingReport = await this.incomeReportRepo.findOneBy({
      forMonth,
      forYear,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (existingReport) {
      throw new HttpException(
        `Report allready exists for month: ${forMonth} and year: ${forYear}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const entity = this.incomeReportRepo.create({
      user,
      forMonth,
      forYear,
    });

    return await this.incomeReportRepo.save(entity);
  }

  async findAll(userId: string): Promise<IncomeReport[]> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    return await this.incomeReportRepo.find({
      where: {
        deletedAt: IsNull(),
        user: { id: userId },
        paycheck: { deletedAt: IsNull() },
        otherIncome: { deletedAt: IsNull() },
        employeeBenefit: { deletedAt: IsNull() },
      },
      relations: {
        paycheck: true,
        otherIncome: true,
        employeeBenefit: true,
      },
    });
  }

  async findOne(
    userId: string,
    findOneIncomeReportInput: FindOneIncomeReportInput,
  ): Promise<IncomeReport> {
    const { forMonth, forYear } = findOneIncomeReportInput;

    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    return await this.incomeReportRepo.findOneOrFail({
      where: {
        user: { id: userId },
        forMonth,
        forYear,
        deletedAt: IsNull(),
        paycheck: { deletedAt: IsNull() },
        otherIncome: { deletedAt: IsNull() },
        employeeBenefit: { deletedAt: IsNull() },
      },
      relations: {
        paycheck: true,
        otherIncome: true,
        employeeBenefit: true,
      },
    });
  }

  async insert(
    userId: string,
    addToIncomeReportInput: InsertIncomeReportInput,
  ): Promise<BulkOperationOutput> {
    const { reportId, employeeBenefit, otherIncome, paycheck } =
      addToIncomeReportInput;

    const currentReport = await this.incomeReportRepo.findOneBy({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentReport)
      throw new EntityNotFoundException(IncomeReport.name, reportId);

    const promiseList: Array<Promise<any>> = [];

    if (employeeBenefit)
      promiseList.push(
        this.employeeBenefitService.bulkInsert(
          employeeBenefit,
          userId,
          reportId,
        ),
      );
    if (otherIncome)
      promiseList.push(
        this.otherIncomeService.bulkInsert(otherIncome, userId, reportId),
      );
    if (paycheck)
      promiseList.push(
        this.paycheckService.bulkInsert(paycheck, userId, reportId),
      );

    return evaluateSettledPromises(await Promise.allSettled(promiseList));
  }

  async update(
    userId: string,
    reportId: number,
    updateIncomeReportInput: UpdateIncomeReportInput,
  ): Promise<BulkOperationOutput> {
    const { employeeBenefit, otherIncome, paycheck, ...report } =
      updateIncomeReportInput;

    const currentReport = await this.incomeReportRepo.findOneBy({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentReport)
      throw new EntityNotFoundException(IncomeReport.name, reportId);

    const promiseList: Array<Promise<any>> = [];
    promiseList.push(
      this.incomeReportRepo.update(
        { id: reportId, user: { id: userId }, deletedAt: IsNull() },
        report,
      ),
    );

    if (employeeBenefit)
      promiseList.push(
        this.employeeBenefitService.bulkUpdate(employeeBenefit, userId),
      );
    if (otherIncome)
      promiseList.push(this.otherIncomeService.bulkUpdate(otherIncome, userId));
    if (paycheck)
      promiseList.push(this.paycheckService.bulkUpdate(paycheck, userId));

    return evaluateSettledPromises(await Promise.allSettled(promiseList));
  }

  async delete(
    userId: string,
    deleteIncomeReportInput: DeleteIncomeReportInput,
  ): Promise<BulkOperationOutput> {
    const { reportId, employeeIds, otherIncomeIds, paycheckIds } =
      deleteIncomeReportInput;

    const report = await this.incomeReportRepo.findOneByOrFail({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    await this.incomeReportRepo.softRemove(report);

    //TODO: use a single transaction for this
    const promiseList: Array<Promise<any>> = [];

    if (employeeIds)
      employeeIds.forEach((id) =>
        promiseList.push(
          this.employeeBenefitService.deleteEmployeeBenefit(
            { employeeBenefitId: id },
            userId,
          ),
        ),
      );

    if (otherIncomeIds)
      otherIncomeIds.forEach((id) =>
        promiseList.push(
          this.otherIncomeService.deleteOtherIncome(
            { otherIncomeId: id },
            userId,
          ),
        ),
      );

    if (paycheckIds)
      paycheckIds.forEach((id) =>
        promiseList.push(
          this.paycheckService.deletePaycheck({ paycheckId: id }, userId),
        ),
      );

    return evaluateSettledPromises(await Promise.allSettled(promiseList));
  }
}
