import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from 'src/expenses/entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import { Repository } from 'typeorm';
import { IncomeReport } from '../entities/income-report.entity';
import { OtherIncome } from '../entities/other-income.entity';
import {
  CreateOtherIncomeInput,
  UpdateOtherIncomeInput,
  DeleteOtherIncomeInput,
} from '../dtos/income.input.dto';

@Injectable()
export class OtherIncomeService {
  constructor(
    @InjectRepository(OtherIncome)
    private OtherIncomeRepo: Repository<OtherIncome>,
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
  ) {}

  async addOtherIncome(
    createOtherIncome: CreateOtherIncomeInput,
  ): Promise<void> {
    const { reportId, ...otherIncome } = createOtherIncome;
    const report = await this.incomeReportRepo.findOneBy({ id: reportId });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = await this.OtherIncomeRepo.create({
      incomeReport: report,
      amount: otherIncome.amount,
      datePayed: otherIncome.datePayed,
      type: otherIncome.type,
    });

    await this.OtherIncomeRepo.save(entity);
  }

  async updateOtherIncome(updateOtherIncome: UpdateOtherIncomeInput) {
    const { otherIncomeId, ...otherIncome } = updateOtherIncome;
    const current_OtherIncome = await this.OtherIncomeRepo.findOneBy({
      id: otherIncomeId,
    });

    if (!current_OtherIncome) {
      throw new EntityNotFoundException(OtherIncome.name, otherIncomeId);
    }

    await this.OtherIncomeRepo.update({ id: otherIncomeId }, otherIncome);
  }

  async deleteOtherIncome(deleteOtherIncome: DeleteOtherIncomeInput) {
    const { otherIncomeId } = deleteOtherIncome;

    await this.OtherIncomeRepo.softDelete({ id: otherIncomeId });
  }
}
