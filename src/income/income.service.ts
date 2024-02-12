import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IncomeReport } from './entities/income-report.entity';
import { UserService } from 'src/user/user.service';
import { CreateIncomeReportInput } from './dtos/income.input.dto';
import { IncomeReportDto } from './dtos/income.common.dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(IncomeReport)
    private incomeReportRepo: Repository<IncomeReport>,
    private userService: UserService,
  ) {}

  async create(
    userId: string,
    createIncomeReport: CreateIncomeReportInput,
  ): Promise<void> {
    const user = await this.userService.findOne(userId);

    const entity = this.incomeReportRepo.create({
      ...createIncomeReport,
      user,
    });

    await this.incomeReportRepo.save(entity);
  }

  async findAll(userId: string): Promise<any[]> {
    const user = await this.userService.findOne(userId);
    return await this.incomeReportRepo.find({
      where: {
        user,
        wage: { deletedAt: IsNull() },
        otherIncome: { deletedAt: IsNull() },
        employeeBenefit: { deletedAt: IsNull() },
      },
      relations: {
        wage: true,
        otherIncome: true,
        employeeBenefit: { employeeBenefitType: true },
      },
    });
  }

  async findOne(userId: string, m) {
    throw new NotImplementedException();
  }

  async upsert(id: number) {
    throw new NotImplementedException();

    return `This action updates a #${id} user`;
  }

  async delete(id: number) {
    const report = await this.incomeReportRepo.findOneByOrFail({
      id,
      deletedAt: IsNull(),
    });
    this.incomeReportRepo.softDelete(report);
  }
}
