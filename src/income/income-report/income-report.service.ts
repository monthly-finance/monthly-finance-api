import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IncomeReport } from '../entities/income-report.entity';
import {
  CreateIncomeReportInput,
  DeleteIncomeReportInput,
  FindOneIncomeReportInput,
  InsertIncomeReportInput,
  UpdateIncomeReportInput,
} from '../dtos/income.input.dto';
import { EntityNotFoundException } from 'src/shared/types/types';
import { User } from 'src/user/entities/user.entity';
import { EmployeeBenefitService } from '../employee-benefit/employee-benefit.service';
import { OtherIncomeService } from '../other-income/other-income.service';
import { PaycheckService } from '../paycheck/paycheck.service';

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
  ): Promise<void> {
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

    await this.incomeReportRepo.save(entity);
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
  ) {
    const { reportId, employeeBenefit, otherIncome, paycheck } =
      addToIncomeReportInput;

    const currentReport = await this.incomeReportRepo.findOneBy({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentReport)
      throw new EntityNotFoundException(IncomeReport.name, reportId);

    if (employeeBenefit)
      await this.employeeBenefitService.bulkInsert(employeeBenefit, userId);
    if (otherIncome)
      await this.otherIncomeService.bulkInsert(otherIncome, userId);
    if (paycheck) await this.paycheckService.bulkInsert(paycheck, userId);
  }

  async update(
    userId: string,
    updateIncomeReportInput: UpdateIncomeReportInput,
  ) {
    const { id, employeeBenefit, otherIncome, paycheck, ...report } =
      updateIncomeReportInput;

    const currentReport = await this.incomeReportRepo.findOneBy({
      id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentReport)
      throw new EntityNotFoundException(IncomeReport.name, id);

    await this.incomeReportRepo.update(
      { id, user: { id: userId }, deletedAt: IsNull() },
      report,
    );

    if (employeeBenefit)
      await this.employeeBenefitService.bulkUpdate(employeeBenefit, userId);
    if (otherIncome)
      await this.otherIncomeService.bulkUpdate(otherIncome, userId);
    if (paycheck) await this.paycheckService.bulkUpdate(paycheck, userId);
  }

  async delete(
    userId: string,
    deleteIncomeReportInput: DeleteIncomeReportInput,
  ) {
    const { reportId: id } = deleteIncomeReportInput;

    const report = await this.incomeReportRepo.findOneByOrFail({
      id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    await this.incomeReportRepo.softRemove(report);
  }
}
