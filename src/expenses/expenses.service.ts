import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from './entities/expense-report.entity';
import { Repository } from 'typeorm';
import { CreateExpenseReportInput } from './dtos/expense.input.dto';
import { ExpenseReportOutput } from './dtos/expense.output.dto';
import { UserService } from 'src/user/user.service';
import { Bank } from './entities/banking/bank.entity';
import { UtilityType } from './entities/utilities.entity.ts/utility-type.entity';
import { Utility } from './entities/utilities.entity.ts/utility.entity';
import { CardEndOfMonthStatement } from './entities/banking/card-statement.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpenseReport)
    private expenseReportRepo: Repository<ExpenseReport>,
    private userService: UserService,
  ) {}

  async create(
    userId: string,
    createExpenseReport: CreateExpenseReportInput,
  ): Promise<void> {
    const user = await this.userService.findOne(userId);

    const entity = this.expenseReportRepo.create({
      ...createExpenseReport,
      user,
    });

    await this.expenseReportRepo.save(entity);
  }

  async findAll(userId: string): Promise<ExpenseReport[]> {
    const user = await this.userService.findOne(userId);
    return await this.expenseReportRepo.find({
      where: {
        user,
        cardEndOfMonthStatement: { deletedAt: null },
        utilities: { deletedAt: null },
      },
      relations: {
        cardEndOfMonthStatement: { bank: true },
        utilities: { type: true },
      },
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number) {
    throw new NotImplementedException();

    return `This action updates a #${id} user`;
  }

  async delete(id: number) {
    return `This action removes a #${id} user`;
  }
}
