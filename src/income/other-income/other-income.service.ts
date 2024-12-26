import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from 'src/expenses/entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import { IsNull, Repository } from 'typeorm';
import { IncomeReport } from '../entities/income-report.entity';
import { OtherIncome } from '../entities/other-income.entity';
import {
  CreateOtherIncomeInput,
  UpdateOtherIncomeInput,
  DeleteOtherIncomeInput,
} from '../dtos/income.input.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { IncomeModule } from '../income.module';

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
  ): Promise<void> {
    const { reportId, ...otherIncome } = createOtherIncome;
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
      amount: otherIncome.amount,
      datePayed: otherIncome.datePayed,
      type: otherIncome.type,
      user,
    });

    await this.otherIncomeRepo.save(entity);
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

    await Promise.all(updatePromises);
  }

  async bulkInsert(
    insertOtherIncomes: CreateOtherIncomeInput[],
    userId: string,
  ) {
    const insertPromises = insertOtherIncomes.map((oi) =>
      this.addOtherIncome(oi, userId),
    );

    await Promise.all(insertPromises);
  }
}
