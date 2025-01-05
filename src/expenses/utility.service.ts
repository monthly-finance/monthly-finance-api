import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from './entities/expense-report.entity';
import { IsNull, Repository } from 'typeorm';
import {
  CreateUtilityInput,
  DeleteUtilityInput,
  UpdateUtilityInput,
} from './dtos/expense.input.dto';
import { EntityNotFoundException } from 'src/shared/types/types';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Utility } from './entities/utility.entity';

@Injectable()
export class UtilityService {
  constructor(
    @InjectRepository(Utility)
    private utilityRepo: Repository<Utility>,
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
    private userService: UserService,
  ) {}

  async addUtility(
    createUtility: CreateUtilityInput,
    userId: string,
    reportId: number,
  ): Promise<Utility> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

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
      user,
      amount: createUtility.amount,
      type: createUtility.type,
    });

    return await this.utilityRepo.save(entity);
  }

  async updateUtility(updateUtility: UpdateUtilityInput, userId: string) {
    const { id, ...utility } = updateUtility;
    const current_utility = await this.utilityRepo.findOneBy({
      id,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_utility) {
      throw new EntityNotFoundException(Utility.name, id);
    }

    await this.utilityRepo.update({ id, user: { id: userId } }, utility);

    return await this.utilityRepo.findOneBy({ id });
  }

  async deleteUtility(deleteUtility: DeleteUtilityInput, userId: string) {
    const { utilityId } = deleteUtility;

    await this.utilityRepo.softDelete({ id: utilityId, user: { id: userId } });
  }

  async bulkUpdate(
    updateUtilities: UpdateUtilityInput[],
    userId: string,
  ): Promise<void> {
    const ids = updateUtilities.map((utility) => utility.id);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size)
      throw new Error('Utility ids are not unique for bulk update');

    const updatePromises = updateUtilities.map((utility) =>
      this.updateUtility(utility, userId),
    );

    await Promise.allSettled(updatePromises);
  }

  async bulkInsert(
    insertUtilities: CreateUtilityInput[],
    userId: string,
    reportId: number,
  ) {
    const insertPromises = insertUtilities.map((statement) =>
      this.addUtility(statement, userId, reportId),
    );

    await Promise.allSettled(insertPromises);
  }
}
