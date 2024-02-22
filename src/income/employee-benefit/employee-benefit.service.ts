import { Injectable } from '@nestjs/common';
import { EmployeeBenefit } from '../entities/employee-benefit/employee-benefit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from 'src/expenses/entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import { Repository } from 'typeorm';
import {
  CreateEmployeeBenefitInput,
  UpdateEmployeeBenefitInput,
  DeleteEmployeeBenefitInput,
} from '../dtos/income.input.dto';
import { IncomeReport } from '../entities/income-report.entity';

@Injectable()
export class EmployeeBenefitService {
  constructor(
    @InjectRepository(EmployeeBenefit)
    private EmployeeBenefitRepo: Repository<EmployeeBenefit>,
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
  ) {}

  async addEmployeeBenefit(
    createEmployeeBenefit: CreateEmployeeBenefitInput,
  ): Promise<void> {
    const { reportId, ...employeeBenefit } = createEmployeeBenefit;
    const report = await this.incomeReportRepo.findOneBy({ id: reportId });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = await this.EmployeeBenefitRepo.create({
      incomeReport: report,
      amount: employeeBenefit.amount,
      datePayed: employeeBenefit.datePayed,
      employeeBenefitType: employeeBenefit.employeeBenefitType,
    });

    await this.EmployeeBenefitRepo.save(entity);
  }

  async updateEmployeeBenefit(
    updateEmployeeBenefit: UpdateEmployeeBenefitInput,
  ) {
    const { employeeBenefitId, ...employeeBenefit } = updateEmployeeBenefit;
    const current_employeeBenefit = await this.EmployeeBenefitRepo.findOneBy({
      id: employeeBenefitId,
    });

    if (!current_employeeBenefit) {
      throw new EntityNotFoundException(
        EmployeeBenefit.name,
        employeeBenefitId,
      );
    }

    await this.EmployeeBenefitRepo.update(
      { id: employeeBenefitId },
      employeeBenefit,
    );
  }

  async deleteEmployeeBenefit(
    deleteEmployeeBenefit: DeleteEmployeeBenefitInput,
  ) {
    const { employeeBenefitId } = deleteEmployeeBenefit;

    await this.EmployeeBenefitRepo.softDelete({ id: employeeBenefitId });
  }
}
