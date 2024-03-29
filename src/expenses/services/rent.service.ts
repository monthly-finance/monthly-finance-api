import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/shared/types/types';
import { IsNull, Repository } from 'typeorm';
import {
  CreateRentInput,
  DeleteRentInput,
  UpdateRentInput,
} from '../dtos/expense.input.dto';
import { ExpenseReport } from '../entities/expense-report.entity';
import { Rent } from '../entities/rent.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepo: Repository<Rent>,
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
    private userService: UserService,
  ) {}

  async addRent(createRent: CreateRentInput, userId: string): Promise<void> {
    const { reportId, ...rent } = createRent;

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new EntityNotFoundException(User.name, userId);
    }

    const report = await this.expenseReportRepo.findOneBy({
      id: reportId,
      deletedAt: IsNull(),
      user: { id: userId },
    });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = this.rentRepo.create({
      expenseReport: report,
      rentAmount: rent.amount,
      rentor: rent.rentor,
      user,
    });

    await this.rentRepo.save(entity);
  }

  async updateRent(updateRent: UpdateRentInput, userId: string) {
    const { rentId, ...rent } = updateRent;
    const current_rent = await this.rentRepo.findOneBy({
      id: rentId,
      user: { id: userId },
      deletedAt: IsNull(),
    });

    if (!current_rent) {
      throw new EntityNotFoundException(Rent.name, rentId);
    }

    await this.rentRepo.update(
      { id: rentId, user: { id: userId } },
      { rentAmount: rent.amount, rentor: rent.rentor },
    );
  }

  async deleteRent(deleteRent: DeleteRentInput, userId: string) {
    const { rentId } = deleteRent;

    await this.rentRepo.softDelete({ id: rentId, user: { id: userId } });
  }
}
