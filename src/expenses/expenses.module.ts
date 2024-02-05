import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEndOfMonthStatement } from './entities/banking/bank-statement.entity';
import { Bank } from './entities/banking/bank.entity';
import { UtilityType } from './entities/utilities.entity.ts/utility-type.entity';
import { Utility } from './entities/utilities.entity.ts/utility.entity';

@Module({
  providers: [ExpensesService],
  controllers: [ExpensesController],
  imports: [
    TypeOrmModule.forFeature([
      BankEndOfMonthStatement,
      Bank,
      UtilityType,
      Utility,
    ]),
  ],
})
export class ExpensesModule {}
