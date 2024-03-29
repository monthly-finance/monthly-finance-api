import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  CreateCardEndOfMonthStatementInput,
  UpdateCardEndOfMonthStatementInput,
  DeleteCardEndOfMonthStatementInput,
} from '../dtos/expense.input.dto';
import { ExpenseReport } from '../entities/expense-report.entity';
import { CardEndOfMonthStatement } from '../entities/banking/card-statement.entity';
import {
  BankingAccountType,
  EntityNotFoundException,
} from 'src/shared/types/types';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

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
  ): Promise<void> {
    const { reportId, ...statement } = createStatement;
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
      amount: statement.amount,
      bankName: statement.bankName,
      accountType: statement.accountType,
      isPayed: statement.isPayed,
      user,
    });

    await this.statementRepo.save(entity);
  }

  async updateStatement(
    updateStatement: UpdateCardEndOfMonthStatementInput,
    userId: string,
  ): Promise<void> {
    const { statementId, ...statement } = updateStatement;
    const current_statement = await this.statementRepo.findOneBy({
      id: statementId,
      deletedAt: IsNull(),
      user: { id: userId },
    });

    if (!current_statement) {
      throw new EntityNotFoundException(
        CardEndOfMonthStatement.name,
        statementId,
      );
    }

    await this.statementRepo.update(
      { id: statementId, user: { id: userId } },
      statement as CardEndOfMonthStatement,
    );
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
}
