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
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

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
  ): Promise<Utility> {
    const { reportId, ...utility } = createUtility;
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
      amount: utility.amount,
      type: utility.type,
    });

    return await this.utilityRepo.save(entity);
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

    return await this.utilityRepo.findOneBy({ id: utilityId });
  }

  async deleteUtility(deleteUtility: DeleteUtilityInput, userId: string) {
    const { utilityId } = deleteUtility;

    await this.utilityRepo.softDelete({ id: utilityId, user: { id: userId } });
  }
}
