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
import { evaluateSettledPromises } from 'src/shared/utils';
import { BulkOperationOutput } from 'src/shared/dto/common.dto';
import { OtherExpenseService } from './other-expense.service';

@Injectable()
export class ExpenseReportService {
  constructor(
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
    private readonly userService: UserService,
    private readonly rentService: RentService,
    private readonly utilityservice: UtilityService,
    private readonly cardStatementService: CardStatementService,
    private readonly otherExpenseService: OtherExpenseService,
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

  async update(
    updateExpenseReport: UpdateExpenseReportInput,
    userId: string,
  ): Promise<BulkOperationOutput> {
    const {
      id,
      utilities,
      cardEndOfMonthStatement,
      rent,
      otherExpense,
      ...report
    } = updateExpenseReport;
    const currentReport = await this.expenseReportRepo.findOneBy({
      id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentReport)
      throw new EntityNotFoundException(ExpenseReport.name, id);

    const promiseList: Array<Promise<any>> = [];

    promiseList.push(
      this.expenseReportRepo.update({ id, deletedAt: IsNull() }, report),
    );
    if (utilities)
      promiseList.push(this.utilityservice.bulkUpdate(utilities, userId));
    if (cardEndOfMonthStatement)
      promiseList.push(
        this.cardStatementService.bulkUpdate(cardEndOfMonthStatement, userId),
      );
    if (rent) promiseList.push(this.rentService.bulkUpdate(rent, userId));
    if (otherExpense)
      promiseList.push(
        this.otherExpenseService.bulkUpdate(otherExpense, userId),
      );

    return evaluateSettledPromises(await Promise.allSettled(promiseList));
  }

  async insert(
    insertExpenseReportInput: InsertExpenseReportInput,
    userId: string,
  ): Promise<BulkOperationOutput> {
    const { reportId, utilities, cardEndOfMonthStatement, rent, otherExpense } =
      insertExpenseReportInput;

    const currentReport = await this.expenseReportRepo.findOneBy({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentReport)
      throw new EntityNotFoundException(ExpenseReport.name, reportId);

    const promiseList: Array<Promise<any>> = [];

    if (utilities)
      promiseList.push(this.utilityservice.bulkInsert(utilities, userId));
    if (cardEndOfMonthStatement)
      promiseList.push(
        this.cardStatementService.bulkInsert(cardEndOfMonthStatement, userId),
      );

    if (rent) promiseList.push(this.rentService.bulkInsert(rent, userId));
    if (otherExpense)
      promiseList.push(
        this.otherExpenseService.bulkInsert(otherExpense, userId, reportId),
      );

    return evaluateSettledPromises(await Promise.allSettled(promiseList));
  }

  async delete(
    deleteExpenseReport: DeleteExpenseReportInput,
    userId: string,
  ): Promise<BulkOperationOutput> {
    const { reportId, cardIds, rentIds, utilityIds, otherExpenseIds } =
      deleteExpenseReport;

    //TODO: this should cascade. Also maybe i should error handle this
    if (rentIds)
      await this.expenseReportRepo.softRemove({
        id: reportId,
        user: { id: userId },
      });

    const promiseList: Array<Promise<any>> = [];

    if (cardIds)
      cardIds.forEach((statementId) => {
        promiseList.push(
          this.cardStatementService.deleteStatement({ statementId }, userId),
        );
      });

    if (rentIds)
      rentIds.forEach((rentId) => {
        promiseList.push(this.rentService.deleteRent({ rentId }, userId));
      });

    if (utilityIds)
      utilityIds.forEach((utilityId) => {
        promiseList.push(
          this.utilityservice.deleteUtility({ utilityId }, userId),
        );
      });
    if (otherExpenseIds)
      otherExpenseIds.forEach((otherExpenseId) => {
        promiseList.push(
          this.otherExpenseService.delete({ otherExpenseId }, userId),
        );
      });

    return evaluateSettledPromises(await Promise.allSettled(promiseList));
  }
}
