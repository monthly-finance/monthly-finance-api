import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from '../entities/expense-report.entity';
import { Repository } from 'typeorm';
import {
  CreateExpenseReportInput,
  DeleteExpenseReportInput,
  FindOneExpenseReportInput,
  UpdateExpenseReportInput,
} from '../dtos/expense.input.dto';
import { Utility } from '../entities/utilities.entity.ts/utility.entity';

@Injectable()
export class ExpenseReportService {
  constructor(
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
  ) {}

  async createExpenseReport(
    userId: string,
    createExpenseReport: CreateExpenseReportInput,
  ): Promise<void> {
    const { forMonth, forYear } = createExpenseReport;

    const existingReport = await this.expenseReportRepo.findOneByOrFail({
      forMonth,
      forYear,
      userId,
    });

    if (existingReport) {
      throw new ConflictException(
        `expense Report for month: ${forMonth} and year ${forYear}`,
      );
    }

    const entity = this.expenseReportRepo.create({
      ...createExpenseReport,
      userId,
    });

    await this.expenseReportRepo.save(entity);
  }

  async findByMonthAndYear(
    userId: string,
    findOneExpenseReport: FindOneExpenseReportInput,
  ) {
    const { forMonth, forYear } = findOneExpenseReport;

    return await this.expenseReportRepo.findOneOrFail({
      where: {
        userId,
        forMonth,
        forYear,
        cardEndOfMonthStatement: { deletedAt: null },
        utilities: { deletedAt: null },
      },
      relations: {
        cardEndOfMonthStatement: { bank: true },
        utilities: { type: true },
      },
    });
  }

  async updateExpenseReport(
    userId: string,
    updateExpenseReport: UpdateExpenseReportInput,
  ) {
    const { reportId: id, ...report } = updateExpenseReport;

    await this.expenseReportRepo.update({ id, userId }, report);
  }

  async deleteExpenseReport(
    userId: string,
    deleteExpenseReport: DeleteExpenseReportInput,
  ) {
    const { reportId: id } = deleteExpenseReport;
    this.expenseReportRepo.delete({ id, userId });
  }
}
