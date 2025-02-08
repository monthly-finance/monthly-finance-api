import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ExpenseReport } from 'src/expenses/entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import { Repository, IsNull } from 'typeorm';
import {
  CreatePaycheckInput,
  UpdatePaycheckInput,
  DeletePaycheckInput,
} from './dtos/income.input.dto';
import { IncomeReport } from './entities/income-report.entity';
import { Paycheck } from './entities/paycheck.entity';

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
    reportId: number,
  ): Promise<Paycheck> {
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
      amount: createPaycheck.amount,
      datePayed:
        createPaycheck.datePayed === ''
          ? new Date().toISOString()
          : createPaycheck.datePayed,
      user,
    });

    return await this.paycheckRepo.save(entity);
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

    return await this.paycheckRepo.findOneBy({ id });
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

    await Promise.allSettled(updatePromises);
  }

  async bulkInsert(
    insertPaycheck: CreatePaycheckInput[],
    userId: string,
    reportId: number,
  ) {
    const insertPromises = insertPaycheck.map((oi) =>
      this.addPaycheck(oi, userId, reportId),
    );

    await Promise.allSettled(insertPromises);
  }
}
