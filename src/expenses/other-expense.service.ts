import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from './entities/expense-report.entity';
import { OtherExpense } from './entities/other-expense.entity';
import { IsNull, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import {
  CreateOtherExpenseInput,
  DeleteOtherExpenseInput,
  UpdateOtherExpenseInput,
} from './dtos/expense.input.dto';
import { EntityNotFoundException } from 'src/shared/types/types';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OtherExpenseService {
  constructor(
    @InjectRepository(OtherExpense)
    private readonly otherExpenseRepo: Repository<OtherExpense>,
    @InjectRepository(ExpenseReport)
    private readonly expenseReportRepo: Repository<ExpenseReport>,
    private userService: UserService,
  ) {}

  async add(
    createOtherExpense: CreateOtherExpenseInput,
    userId: string,
    reportId: number,
  ): Promise<OtherExpense> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    const report = await this.expenseReportRepo.findOneBy({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = this.otherExpenseRepo.create({
      expenseReport: report,
      amount: createOtherExpense.amount,
      datePayed: createOtherExpense.datePayed,
      type: createOtherExpense.type,
      user,
    });

    return await this.otherExpenseRepo.save(entity);
  }

  async update(updateOtherExpense: UpdateOtherExpenseInput, userId: string) {
    const { id, ...otherExpense } = updateOtherExpense;
    const current_OtherIncome = await this.otherExpenseRepo.findOneBy({
      id: id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_OtherIncome) {
      throw new EntityNotFoundException(OtherExpense.name, id);
    }

    await this.otherExpenseRepo.update(
      { id, user: { id: userId } },
      otherExpense,
    );

    return await this.otherExpenseRepo.findOneBy({ id });
  }

  async delete(deleteOtherExpense: DeleteOtherExpenseInput, userId: string) {
    const { otherExpenseId } = deleteOtherExpense;

    await this.otherExpenseRepo.softDelete({
      id: otherExpenseId,
      user: { id: userId },
    });
  }

  async bulkUpdate(
    updateOtherExpenseInputs: UpdateOtherExpenseInput[],
    userId: string,
  ): Promise<void> {
    const ids = updateOtherExpenseInputs.map((oi) => oi.id);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size)
      throw new Error('Other Expense ids are not unique for bulk update');

    const updatePromises = updateOtherExpenseInputs.map((oe) =>
      this.update(oe, userId),
    );

    await Promise.allSettled(updatePromises);
  }

  async bulkInsert(
    insertOtherExpenses: CreateOtherExpenseInput[],
    userId: string,
    reportId: number,
  ) {
    const insertPromises = insertOtherExpenses.map((oe) =>
      this.add(oe, userId, reportId),
    );

    await Promise.allSettled(insertPromises);
  }
}
