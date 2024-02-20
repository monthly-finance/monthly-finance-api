import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/shared/types/types';
import { Repository } from 'typeorm';
import {
  CreateRentInput,
  DeleteRentInput,
  UpdateRentInput,
} from '../dtos/expense.input.dto';
import { ExpenseReport } from '../entities/expense-report.entity';
import { Rent } from '../entities/rent.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepo: Repository<Rent>,
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
  ) {}

  async addRent(createRent: CreateRentInput): Promise<void> {
    const { reportId, ...rent } = createRent;
    const report = await this.expenseReportRepo.findOneBy({ id: reportId });

    if (!report) {
      throw new EntityNotFoundException(ExpenseReport.name, reportId);
    }

    const entity = await this.rentRepo.create({
      expenseReport: report,
      rentAmount: rent.amount,
      rentor: rent.rentor,
    });

    await this.rentRepo.save(entity);
  }

  async updateRent(updateRent: UpdateRentInput) {
    const { rentId, ...rent } = updateRent;
    const current_rent = await this.rentRepo.findOneBy({ id: rentId });

    if (!current_rent) {
      throw new ConflictException(`Rent with ${rentId} does not exists`);
    }

    await this.rentRepo.update(
      { id: rentId },
      { rentAmount: rent.amount, rentor: rent.rentor },
    );
  }

  async deleteRent(deleteRent: DeleteRentInput) {
    const { rentId } = deleteRent;

    await this.rentRepo.softDelete({ id: rentId });
  }
}
