import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCardEndOfMonthStatementInput,
  UpdateCardEndOfMonthStatementInput,
  DeleteCardEndOfMonthStatementInput,
} from '../dtos/expense.input.dto';
import { ExpenseReport } from '../entities/expense-report.entity';
import { CardEndOfMonthStatement } from '../entities/banking/card-statement.entity';
import { EntityNotFoundException } from 'src/shared/types/types';

@Injectable()
export class CardStatementService {
  constructor(
    @InjectRepository(CardEndOfMonthStatement)
    private statementRepo: Repository<CardEndOfMonthStatement>,
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
  ) {}

  async addStatement(
    createStatement: CreateCardEndOfMonthStatementInput,
  ): Promise<void> {
    const { reportId, ...statement } = createStatement;
    const report = await this.expenseReportRepo.findOneBy({
      id: reportId,
    });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = this.statementRepo.create(statement);

    await this.statementRepo.save({
      expenseReport: report,
      ...(entity as CardEndOfMonthStatement),
    });
  }

  async updateStatement(
    updateStatement: UpdateCardEndOfMonthStatementInput,
  ): Promise<void> {
    const { statementId, ...statement } = updateStatement;

    await this.statementRepo.update(
      { id: statementId },
      statement as CardEndOfMonthStatement,
    );
  }

  async deleteStatement(
    deleteStatement: DeleteCardEndOfMonthStatementInput,
  ): Promise<void> {
    const { statementId } = deleteStatement;

    await this.statementRepo.softDelete(statementId);
  }
}
