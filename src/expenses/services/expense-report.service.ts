import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from '../entities/expense-report.entity';
import { IsNull, Repository } from 'typeorm';
import {
  CreateExpenseReportInput,
  DeleteExpenseReportInput,
  FindOneExpenseReportInput,
  UpdateExpenseReportInput,
} from '../dtos/expense.input.dto';

@Injectable()
export class ExpenseReportService {
  constructor(
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
  ) {}

  async create(
    userId: string,
    createExpenseReport: CreateExpenseReportInput,
  ): Promise<void> {
    const { forMonth, forYear } = createExpenseReport;

    const existingReport = await this.expenseReportRepo.findOneBy({
      forMonth,
      forYear,
      user: { id: userId },
    });

    if (existingReport) {
      throw new ConflictException(
        `expense Report for month: ${forMonth} and year ${forYear}`,
      );
    }

    const entity = this.expenseReportRepo.create({
      ...createExpenseReport,
      user: { id: userId },
    });

    await this.expenseReportRepo.save(entity);
  }

  async findAll(userId: string) {
    return await this.expenseReportRepo.find({
      where: {
        user: { id: userId },
        cardEndOfMonthStatement: { deletedAt: IsNull() },
        utilities: { deletedAt: IsNull() },
        rent: { deletedAt: IsNull() },
      },
      relations: {
        cardEndOfMonthStatement: { bank: true },
        utilities: { type: true },
        rent: true,
      },
    });
  }

  async findByMonthAndYear(
    userId: string,
    findOneExpenseReport: FindOneExpenseReportInput,
  ) {
    const { forMonth, forYear } = findOneExpenseReport;

    return await this.expenseReportRepo.findOneOrFail({
      where: {
        user: { id: userId },
        forMonth,
        forYear,
        cardEndOfMonthStatement: { deletedAt: IsNull() },
        utilities: { deletedAt: IsNull() },
        rent: { deletedAt: IsNull() },
      },
      relations: {
        cardEndOfMonthStatement: { bank: true },
        utilities: { type: true },
        rent: true,
      },
    });
  }

  async update(updateExpenseReport: UpdateExpenseReportInput) {
    const { reportId: id, ...report } = updateExpenseReport;

    await this.expenseReportRepo.update({ id }, report);
  }

  async delete(deleteExpenseReport: DeleteExpenseReportInput) {
    const { reportId: id } = deleteExpenseReport;
    this.expenseReportRepo.delete({ id });
  }
}
