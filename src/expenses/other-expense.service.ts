import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseReport } from './entities/expense-report.entity';
import { OtherExpense } from './entities/other-expense.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateOtherExpenseInput } from './dtos/expense.input.dto';

@Injectable()
export class OtherExpenseService {
  constructor(
    @InjectRepository(OtherExpense)
    private readonly otherExpenseRepo: Repository<OtherExpense>,
    @InjectRepository(ExpenseReport)
    private readonly expenseReportRepo: Repository<ExpenseReport>,
    private userService: UserService,
  ) {}

  async add(
    createOtherExpense: CreateOtherExpenseInput,
    userId: string,
  ): Promise<OtherExpense> {
    const { reportId, ...rent } = createOtherExpense;

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

    return await this.rentRepo.save(entity);
  }
}
