import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from '../entities/expense-report.entity';
import { IsNull, Repository } from 'typeorm';
import {
  CreateUtilityInput,
  DeleteUtilityInput,
  UpdateUtilityInput,
} from '../dtos/expense.input.dto';
import { Utility } from '../entities/utility/utility.entity';
import { EntityNotFoundException } from 'src/shared/types/types';

@Injectable()
export class UtilityService {
  constructor(
    @InjectRepository(Utility)
    private utilityRepo: Repository<Utility>,
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
  ) {}

  async addUtility(
    createUtility: CreateUtilityInput,
    userId: string,
  ): Promise<void> {
    const { reportId, ...utility } = createUtility;
    const report = await this.expenseReportRepo.findOneBy({
      id: reportId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = this.utilityRepo.create({
      expenseReport: report,
      ...utility,
    });

    await this.utilityRepo.save(entity);
  }

  async updateUtility(updateUtility: UpdateUtilityInput, userId: string) {
    const { utilityId, ...utility } = updateUtility;
    const current_utility = await this.utilityRepo.findOneBy({
      id: utilityId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_utility) {
      throw new EntityNotFoundException(Utility.name, utilityId);
    }

    await this.utilityRepo.update(
      { id: utilityId, user: { id: userId } },
      utility,
    );
  }

  async deleteUtility(deleteUtility: DeleteUtilityInput, userId: string) {
    const { utilityId } = deleteUtility;

    await this.utilityRepo.softDelete({ id: utilityId, user: { id: userId } });
  }
}
