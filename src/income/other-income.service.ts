import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from 'src/expenses/entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import { OtherIncome } from './entities/other-income.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository, IsNull } from 'typeorm';
import {
  CreateOtherIncomeInput,
  UpdateOtherIncomeInput,
  DeleteOtherIncomeInput,
} from './dtos/income.input.dto';
import { IncomeReport } from './entities/income-report.entity';

@Injectable()
export class OtherIncomeService {
  constructor(
    @InjectRepository(OtherIncome)
    private otherIncomeRepo: Repository<OtherIncome>,
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
    private userService: UserService,
  ) {}

  async addOtherIncome(
    createOtherIncome: CreateOtherIncomeInput,
    userId: string,
    reportId: number,
  ): Promise<OtherIncome> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    const report = await this.incomeReportRepo.findOneBy({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = this.otherIncomeRepo.create({
      incomeReport: report,
      amount: createOtherIncome.amount,
      datePayed:
        createOtherIncome.datePayed === ''
          ? new Date().toISOString()
          : createOtherIncome.datePayed,
      type: createOtherIncome.type,
      user,
    });

    return await this.otherIncomeRepo.save(entity);
  }

  async updateOtherIncome(
    updateOtherIncome: UpdateOtherIncomeInput,
    userId: string,
  ) {
    const { id, ...otherIncome } = updateOtherIncome;
    const current_OtherIncome = await this.otherIncomeRepo.findOneBy({
      id: id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_OtherIncome) {
      throw new EntityNotFoundException(OtherIncome.name, id);
    }

    await this.otherIncomeRepo.update(
      { id, user: { id: userId } },
      otherIncome,
    );

    return await this.otherIncomeRepo.findOneBy({ id });
  }

  async deleteOtherIncome(
    deleteOtherIncome: DeleteOtherIncomeInput,
    userId: string,
  ) {
    const { otherIncomeId } = deleteOtherIncome;

    await this.otherIncomeRepo.softDelete({
      id: otherIncomeId,
      user: { id: userId },
    });
  }

  async bulkUpdate(
    updateOtherIncomeInputs: UpdateOtherIncomeInput[],
    userId: string,
  ): Promise<void> {
    const ids = updateOtherIncomeInputs.map((oi) => oi.id);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size)
      throw new Error('Other Income ids are not unique for bulk update');

    const updatePromises = updateOtherIncomeInputs.map((oi) =>
      this.updateOtherIncome(oi, userId),
    );

    await Promise.allSettled(updatePromises);
  }

  async bulkInsert(
    insertOtherIncomes: CreateOtherIncomeInput[],
    userId: string,
    reportId: number,
  ) {
    const insertPromises = insertOtherIncomes.map((oi) =>
      this.addOtherIncome(oi, userId, reportId),
    );

    await Promise.allSettled(insertPromises);
  }
}
