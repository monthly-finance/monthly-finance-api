import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from '../entities/expense-report.entity';
import { Repository } from 'typeorm';
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

  async addUtility(createUtility: CreateUtilityInput): Promise<void> {
    const { reportId, ...utility } = createUtility;
    const report = await this.expenseReportRepo.findOneBy({ id: reportId });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = await this.utilityRepo.create({
      expenseReport: report,
      ...utility,
    });

    await this.utilityRepo.save(entity);
  }

  async updateUtility(updateUtility: UpdateUtilityInput) {
    const { utilityId, ...utility } = updateUtility;
    const current_utility = await this.utilityRepo.findOneBy({ id: utilityId });

    if (!current_utility) {
      throw new ConflictException(`Utilty with ${utilityId} does not exists`);
    }

    await this.utilityRepo.update({ id: utilityId }, utility);
  }

  async deleteUtility(deleteUtility: DeleteUtilityInput) {
    const { utilityId } = deleteUtility;

    await this.utilityRepo.softDelete({ id: utilityId });
  }
}
