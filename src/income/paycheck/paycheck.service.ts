import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paycheck } from '../entities/paycheck.entity';
import { Repository } from 'typeorm';
import { IncomeReport } from '../entities/income-report.entity';

import { ExpenseReport } from 'src/expenses/entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import {
  CreatePaycheckInput,
  DeletePaycheckInput,
  UpdatePaycheckInput,
} from '../dtos/income.input.dto';

@Injectable()
export class PaycheckService {
  constructor(
    @InjectRepository(Paycheck)
    private paycheckRepo: Repository<Paycheck>,
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
  ) {}

  async addPaycheck(createPaycheck: CreatePaycheckInput): Promise<void> {
    const { reportId, ...paycheck } = createPaycheck;
    const report = await this.incomeReportRepo.findOneBy({ id: reportId });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = await this.paycheckRepo.create({
      incomeReport: report,
      amount: paycheck.amount,
      datePayed: paycheck.datePayed,
    });

    await this.paycheckRepo.save(entity);
  }

  async updatePaycheck(updatePaycheck: UpdatePaycheckInput) {
    const { paycheckId, ...paycheck } = updatePaycheck;
    const current_Paycheck = await this.paycheckRepo.findOneBy({
      id: paycheckId,
    });

    if (!current_Paycheck) {
      throw new EntityNotFoundException(Paycheck.name, paycheckId);
    }

    await this.paycheckRepo.update({ id: paycheckId }, paycheck);
  }

  async deletePaycheck(deletePaycheck: DeletePaycheckInput) {
    const { paycheckId } = deletePaycheck;

    await this.paycheckRepo.softDelete({ id: paycheckId });
  }
}
