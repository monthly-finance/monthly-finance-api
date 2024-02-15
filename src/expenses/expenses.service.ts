import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from './entities/expense-report.entity';
import { IsNull, Repository } from 'typeorm';
import {
  CreateExpenseReportInput,
  DeleteExpenseReportInput,
  FindOneExpenseReportInput,
  UpdateExpenseReportInput,
} from './dtos/expense.input.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
    private userService: UserService,
  ) {}

  async create(
    userId: string,
    createExpenseReport: CreateExpenseReportInput,
  ): Promise<void> {
    const user = await this.userService.findOne(userId);

    const entity = this.expenseReportRepo.create({
      ...createExpenseReport,
      user,
    });

    await this.expenseReportRepo.save(entity);
  }

  async findAll(userId: string): Promise<ExpenseReport[]> {
    const user = await this.userService.findOne(userId);
    return await this.expenseReportRepo.find({
      where: {
        user,
        cardEndOfMonthStatement: { deletedAt: null },
        utilities: { deletedAt: null },
      },
      relations: {
        cardEndOfMonthStatement: { bank: true },
        utilities: { type: true },
      },
    });
  }

  async findOne(
    userId: string,
    findOneExpenseReportInput: FindOneExpenseReportInput,
  ): Promise<ExpenseReport> {
    const { forMonth, forYear } = findOneExpenseReportInput;

    const user = await this.userService.findOne(userId);

    return this.expenseReportRepo.findOneOrFail({
      where: {
        user,
        forMonth,
        forYear,
        deletedAt: IsNull(),
        cardEndOfMonthStatement: { deletedAt: IsNull() },
        utilities: { deletedAt: IsNull() },
      },
      relations: {
        cardEndOfMonthStatement: true,
        utilities: true,
      },
    });
  }

  async update(updateExpenseReportInput: UpdateExpenseReportInput) {
    const { reportId: id, ...report } = updateExpenseReportInput;
    await this.expenseReportRepo.update({ id }, report);
  }

  async delete(deleteExpenseReportInput: DeleteExpenseReportInput) {
    const { reportId: id } = deleteExpenseReportInput;

    const report = await this.expenseReportRepo.findOneByOrFail({
      id,
      deletedAt: IsNull(),
    });

    await this.expenseReportRepo.softDelete(report);
  }
}
