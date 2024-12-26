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
    private employeeBenefitRepo: Repository<EmployeeBenefit>,
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
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = this.employeeBenefitRepo.create({
      incomeReport: report,
      type: employeeBenefit.type,
      amount: employeeBenefit.amount,
      datePayed: employeeBenefit.datePayed,
      user,
    });

    await this.employeeBenefitRepo.save(entity);
  }

  async updateEmployeeBenefit(
    updateEmployeeBenefit: UpdateEmployeeBenefitInput,
    userId: string,
  ) {
    const { id: employeeBenefitId, ...employeeBenefit } = updateEmployeeBenefit;

    const current_employeeBenefit = await this.employeeBenefitRepo.findOneBy({
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

    await this.employeeBenefitRepo.update(
      { id: employeeBenefitId, user: { id: userId }, deletedAt: IsNull() },
      employeeBenefit,
    );
  }

  async deleteEmployeeBenefit(
    deleteEmployeeBenefit: DeleteEmployeeBenefitInput,
    userId: string,
  ) {
    const { employeeBenefitId } = deleteEmployeeBenefit;

    await this.employeeBenefitRepo.softDelete({
      id: employeeBenefitId,
      user: { id: userId },
    });
  }

  async bulkUpdate(
    updateEmployeeBenefitInputs: UpdateEmployeeBenefitInput[],
    userId: string,
  ): Promise<void> {
    const ids = updateEmployeeBenefitInputs.map((eb) => eb.id);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size)
      throw new Error('Employee Benefit ids are not unique for bulk update');

    const updatePromises = updateEmployeeBenefitInputs.map((eb) =>
      this.updateEmployeeBenefit(eb, userId),
    );

    await Promise.all(updatePromises);
  }

  async bulkInsert(
    insertEmployeeBenefits: CreateEmployeeBenefitInput[],
    userId: string,
  ) {
    const insertPromises = insertEmployeeBenefits.map((eb) =>
      this.addEmployeeBenefit(eb, userId),
    );

    await Promise.all(insertPromises);
  }
}
