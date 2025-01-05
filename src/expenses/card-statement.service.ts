import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  CreateCardEndOfMonthStatementInput,
  UpdateCardEndOfMonthStatementInput,
  DeleteCardEndOfMonthStatementInput,
} from './dtos/expense.input.dto';
import { ExpenseReport } from './entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CardEndOfMonthStatement } from './entities/card-statement.entity';

@Injectable()
export class CardStatementService {
  constructor(
    @InjectRepository(CardEndOfMonthStatement)
    private statementRepo: Repository<CardEndOfMonthStatement>,
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
    @InjectRepository(ExpenseReport)
    private bankRepo: Repository<ExpenseReport>,
    private userService: UserService,
  ) {}

  async addStatement(
    createStatement: CreateCardEndOfMonthStatementInput,
    userId: string,
    reportId: number,
  ): Promise<CardEndOfMonthStatement> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    const report = await this.expenseReportRepo.findOneBy({
      id: reportId,
      deletedAt: IsNull(),
      user: { id: userId },
    });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = this.statementRepo.create({
      expenseReport: report,
      amount: createStatement.amount,
      bankName: createStatement.bankName,
      accountType: createStatement.accountType,
      isPayed: createStatement.isPayed,
      user,
    });

    return await this.statementRepo.save(entity);
  }

  async updateStatement(
    updateStatement: UpdateCardEndOfMonthStatementInput,
    userId: string,
  ): Promise<CardEndOfMonthStatement> {
    const { id, ...statement } = updateStatement;
    const current_statement = await this.statementRepo.findOneBy({
      id: id,
      deletedAt: IsNull(),
      user: { id: userId },
    });

    if (!current_statement) {
      throw new EntityNotFoundException(CardEndOfMonthStatement.name, id);
    }

    await this.statementRepo.update(
      { id, user: { id: userId } },
      statement as CardEndOfMonthStatement,
    );

    return await this.statementRepo.findOneBy({ id });
  }

  async deleteStatement(
    deleteStatement: DeleteCardEndOfMonthStatementInput,
    userId: string,
  ): Promise<void> {
    const { statementId } = deleteStatement;

    await this.statementRepo.softDelete({
      id: statementId,
      user: { id: userId },
    });
  }

  async bulkUpdate(
    updateStatements: UpdateCardEndOfMonthStatementInput[],
    userId: string,
  ): Promise<void> {
    const ids = updateStatements.map((statement) => statement.id);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size)
      throw new Error('Card Statement ids are not unique for bulk update');

    const updatePromises = updateStatements.map((statement) =>
      this.updateStatement(statement, userId),
    );

    await Promise.allSettled(updatePromises);
  }

  async bulkInsert(
    insertStatement: CreateCardEndOfMonthStatementInput[],
    userId: string,
    reportId: number,
  ) {
    const insertPromises = insertStatement.map((statement) =>
      this.addStatement(statement, userId, reportId),
    );

    await Promise.allSettled(insertPromises);
  }
}
