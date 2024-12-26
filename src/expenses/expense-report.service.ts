import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from './entities/expense-report.entity';
import { IsNull, Repository } from 'typeorm';
import {
  CreateExpenseReportInput,
  DeleteExpenseReportInput,
  FindOneExpenseReportInput,
  InsertExpenseReportInput,
  UpdateExpenseReportInput,
} from './dtos/expense.input.dto';
import { EntityNotFoundException } from 'src/shared/types/types';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { RentService } from './rent.service';
import { UtilityService } from './utility.service';
import { CardStatementService } from './card-statement.service';

@Injectable()
export class ExpenseReportService {
  constructor(
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
    private readonly userService: UserService,
    private readonly rentService: RentService,
    private readonly utilityservice: UtilityService,
    private readonly cardStatementService: CardStatementService,
  ) {}

  async create(
    userId: string,
    createExpenseReport: CreateExpenseReportInput,
  ): Promise<ExpenseReport> {
    const { forMonth, forYear } = createExpenseReport;

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    const existingReport = await this.expenseReportRepo.findOneBy({
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

    const entity = this.expenseReportRepo.create({
      forMonth,
      forYear,
      user,
    });

    return await this.expenseReportRepo.save(entity);
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
        cardEndOfMonthStatement: true,
        utilities: true,
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
        cardEndOfMonthStatement: true,
        utilities: true,
        rent: true,
      },
    });
  }

  async update(updateExpenseReport: UpdateExpenseReportInput, userId: string) {
    const { id, utilities, cardEndOfMonthStatement, rent, ...report } =
      updateExpenseReport;
    const currentReport = await this.expenseReportRepo.findOneBy({
      id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentReport)
      throw new EntityNotFoundException(ExpenseReport.name, id);

    await this.expenseReportRepo.update({ id, deletedAt: IsNull() }, report);

    if (utilities) await this.utilityservice.bulkUpdate(utilities, userId);
    if (cardEndOfMonthStatement)
      await this.cardStatementService.bulkUpdate(
        cardEndOfMonthStatement,
        userId,
      );
    if (rent) await this.rentService.bulkUpdate(rent, userId);
  }

  async insert(
    insertExpenseReportInput: InsertExpenseReportInput,
    userId: string,
  ): Promise<void> {
    const { reportId, utilities, cardEndOfMonthStatement, rent } =
      insertExpenseReportInput;

    const currentReport = await this.expenseReportRepo.findOneBy({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentReport)
      throw new EntityNotFoundException(ExpenseReport.name, reportId);

    if (utilities) await this.utilityservice.bulkInsert(utilities, userId);
    if (cardEndOfMonthStatement)
      await this.cardStatementService.bulkInsert(
        cardEndOfMonthStatement,
        userId,
      );
    if (rent) await this.rentService.bulkInsert(rent, userId);
  }

  async delete(deleteExpenseReport: DeleteExpenseReportInput, userId: string) {
    const { reportId: id } = deleteExpenseReport;
    this.expenseReportRepo.softRemove({ id, user: { id: userId } });
  }
}
