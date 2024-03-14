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
    private OtherIncomeRepo: Repository<OtherIncome>,
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

    const entity = this.OtherIncomeRepo.create({
      incomeReport: report,
      amount: otherIncome.amount,
      datePayed: otherIncome.datePayed,
      type: otherIncome.type,
      user,
    });

    await this.OtherIncomeRepo.save(entity);
  }

  async updateOtherIncome(
    updateOtherIncome: UpdateOtherIncomeInput,
    userId: string,
  ) {
    const { otherIncomeId, ...otherIncome } = updateOtherIncome;
    const current_OtherIncome = await this.OtherIncomeRepo.findOneBy({
      id: otherIncomeId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_OtherIncome) {
      throw new EntityNotFoundException(OtherIncome.name, otherIncomeId);
    }

    await this.OtherIncomeRepo.update(
      { id: otherIncomeId, user: { id: userId } },
      otherIncome,
    );
  }

  async deleteOtherIncome(
    deleteOtherIncome: DeleteOtherIncomeInput,
    userId: string,
  ) {
    const { otherIncomeId } = deleteOtherIncome;

    await this.OtherIncomeRepo.softDelete({
      id: otherIncomeId,
      user: { id: userId },
    });
  }
}
