import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IncomeReport } from '../entities/income-report.entity';
import {
  CreateIncomeReportInput,
  DeleteIncomeReportInput,
  FindOneIncomeReportInput,
  UpdateIncomeReportInput,
} from '../dtos/income.input.dto';
import { EntityNotFoundException } from 'src/shared/types/types';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class IncomeReportService {
  constructor(
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
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
        user: { id: userId },
        paycheck: { deletedAt: IsNull() },
        otherIncome: { deletedAt: IsNull() },
        employeeBenefit: { deletedAt: IsNull() },
      },
      relations: {
        paycheck: true,
        otherIncome: true,
        employeeBenefit: { employeeBenefitType: true },
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
        user,
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
        employeeBenefit: { employeeBenefitType: true },
      },
    });
  }

  async update(
    userId: string,
    updateIncomeReportInput: UpdateIncomeReportInput,
  ) {
    const { reportId: id, ...report } = updateIncomeReportInput;
    const current_report = await this.incomeReportRepo.findOneBy({
      id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_report) {
      throw new EntityNotFoundException(IncomeReport.name, id);
    }

    await this.incomeReportRepo.update({ id, user: { id: userId } }, report);
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

    await this.incomeReportRepo.delete(report);
  }
}
