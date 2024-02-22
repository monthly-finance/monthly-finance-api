import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IncomeReport } from '../entities/income-report.entity';
import { UserService } from 'src/user/user.service';
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
    private userService: UserService,
  ) {}

  async create(
    userId: string,
    createIncomeReport: CreateIncomeReportInput,
  ): Promise<void> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    const entity = this.incomeReportRepo.create({
      ...createIncomeReport,
      user,
    });

    await this.incomeReportRepo.save(entity);
  }

  async findAll(userId: string): Promise<IncomeReport[]> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    return await this.incomeReportRepo.find({
      where: {
        user,
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

    const user = await this.userService.findOne(userId);

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

  async update(updateIncomeReportInput: UpdateIncomeReportInput) {
    const { reportId: id, ...report } = updateIncomeReportInput;
    await this.incomeReportRepo.update({ id }, report);
  }

  async delete(deleteIncomeReportInput: DeleteIncomeReportInput) {
    const { reportId: id } = deleteIncomeReportInput;

    const report = await this.incomeReportRepo.findOneByOrFail({
      id,
      deletedAt: IsNull(),
    });

    await this.incomeReportRepo.delete(report);
  }
}
