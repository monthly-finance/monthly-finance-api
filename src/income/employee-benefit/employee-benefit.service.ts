import { Injectable } from '@nestjs/common';
import { EmployeeBenefit } from '../entities/employee-benefit/employee-benefit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from 'src/expenses/entities/expense-report.entity';
import { EntityNotFoundException } from 'src/shared/types/types';
import { IsNull, Repository } from 'typeorm';
import {
  CreateEmployeeBenefitInput,
  UpdateEmployeeBenefitInput,
  DeleteEmployeeBenefitInput,
} from '../dtos/income.input.dto';
import { IncomeReport } from '../entities/income-report.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmployeeBenefitService {
  constructor(
    @InjectRepository(EmployeeBenefit)
    private EmployeeBenefitRepo: Repository<EmployeeBenefit>,
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
    private userService: UserService,
  ) {}

  async addEmployeeBenefit(
    createEmployeeBenefit: CreateEmployeeBenefitInput,
    userId: string,
  ): Promise<void> {
    const { reportId, ...employeeBenefit } = createEmployeeBenefit;
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    const report = await this.incomeReportRepo.findOneBy({
      id: reportId,
      user,
      deletedAt: IsNull(),
    });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = this.EmployeeBenefitRepo.create({
      incomeReport: report,
      amount: employeeBenefit.amount,
      datePayed: employeeBenefit.datePayed,
      employeeBenefitType: employeeBenefit.employeeBenefitType,
      user,
    });

    await this.EmployeeBenefitRepo.save(entity);
  }

  async updateEmployeeBenefit(
    updateEmployeeBenefit: UpdateEmployeeBenefitInput,
    userId: string,
  ) {
    const { employeeBenefitId, ...employeeBenefit } = updateEmployeeBenefit;

    const current_employeeBenefit = await this.EmployeeBenefitRepo.findOneBy({
      id: employeeBenefitId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_employeeBenefit) {
      throw new EntityNotFoundException(
        EmployeeBenefit.name,
        employeeBenefitId,
      );
    }

    await this.EmployeeBenefitRepo.update(
      { id: employeeBenefitId, user: { id: userId }, deletedAt: IsNull() },
      employeeBenefit,
    );
  }

  async deleteEmployeeBenefit(
    deleteEmployeeBenefit: DeleteEmployeeBenefitInput,
    userId: string,
  ) {
    const { employeeBenefitId } = deleteEmployeeBenefit;

    await this.EmployeeBenefitRepo.softDelete({
      id: employeeBenefitId,
      user: { id: userId },
    });
  }
}
