import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paycheck } from '../entities/paycheck.entity';
import { IsNull, Repository } from 'typeorm';
import { IncomeReport } from '../entities/income-report.entity';

import { ExpenseReport } from 'src/expenses/entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import {
  CreatePaycheckInput,
  DeletePaycheckInput,
  UpdatePaycheckInput,
} from '../dtos/income.input.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PaycheckService {
  constructor(
    @InjectRepository(Paycheck)
    private paycheckRepo: Repository<Paycheck>,
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
    private userService: UserService,
  ) {}

  async addPaycheck(
    createPaycheck: CreatePaycheckInput,
    userId: string,
  ): Promise<void> {
    const { reportId, ...paycheck } = createPaycheck;

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

    const entity = this.paycheckRepo.create({
      incomeReport: report,
      amount: paycheck.amount,
      datePayed: paycheck.datePayed,
      user,
    });

    await this.paycheckRepo.save(entity);
  }

  async updatePaycheck(updatePaycheck: UpdatePaycheckInput, userId: string) {
    const { id, ...paycheck } = updatePaycheck;
    const currentPaycheck = await this.paycheckRepo.findOneBy({
      id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!currentPaycheck) {
      throw new EntityNotFoundException(Paycheck.name, id);
    }

    await this.paycheckRepo.update({ id }, paycheck);
  }

  async deletePaycheck(deletePaycheck: DeletePaycheckInput, userId: string) {
    const { paycheckId } = deletePaycheck;

    await this.paycheckRepo.softDelete({
      id: paycheckId,
      user: { id: userId },
    });
  }

  async bulkUpdate(
    updatePaycheckInputs: UpdatePaycheckInput[],
    userId: string,
  ): Promise<void> {
    const ids = updatePaycheckInputs.map((eb) => eb.id);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size)
      throw new Error('Paycheck ids are not unique for bulk update');

    const updatePromises = updatePaycheckInputs.map((paycheck) =>
      this.updatePaycheck(paycheck, userId),
    );

    await Promise.all(updatePromises);
  }
}
