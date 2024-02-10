import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from './entities/expense-report.entity';
import { Repository } from 'typeorm';
import { CreateExpenseReportInput } from './dto/expense.input.dto';
import { ExpenseReportOutput } from './dto/expense.output.dto';
import { UserService } from 'src/user/user.service';
import exp from 'constants';

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

    const;

    const entity = this.expenseReportRepo.create({
      ...createExpenseReport,
      user,
    });

    await this.expenseReportRepo.save(entity);
  }

  async findAll(userId: string): Promise<ExpenseReport[]> {
    const user = await this.userService.findOne(userId);
    return await this.expenseReportRepo.findBy({ user });
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
