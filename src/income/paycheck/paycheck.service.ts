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
    const { paycheckId, ...paycheck } = updatePaycheck;
    const current_Paycheck = await this.paycheckRepo.findOneBy({
      id: paycheckId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_Paycheck) {
      throw new EntityNotFoundException(Paycheck.name, paycheckId);
    }

    await this.paycheckRepo.update({ id: paycheckId }, paycheck);
  }

  async deletePaycheck(deletePaycheck: DeletePaycheckInput, userId: string) {
    const { paycheckId } = deletePaycheck;

    await this.paycheckRepo.softDelete({
      id: paycheckId,
      user: { id: userId },
    });
  }
}
