import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MFContext } from 'src/shared/types/types';
import { RequestContext } from 'src/auth/types/auth.type';
import {
  CreateExpenseReportInput,
  FindOneExpenseReportInput,
  UpdateExpenseReportInput,
  DeleteExpenseReportInput,
  InsertExpenseReportInput,
} from './dtos/expense.input.dto';
import { ExpenseReport } from './entities/expense-report.entity';
import { ExpenseReportService } from './expense-report.service';
import { BulkOperationOutput } from 'src/shared/dto/common.dto';

@Controller('expense/expense-report')
@ApiBearerAuth()
@ApiTags('Expense Report')
@UseInterceptors(ClassSerializerInterceptor)
export class ExpensesController {
  constructor(private service: ExpenseReportService) {}

  @Get()
  @ApiOperation({ summary: 'Find All Expense Reports' })
  async findAllExpenseReport(
    @MFContext() context: RequestContext,
  ): Promise<ExpenseReport[]> {
    const res = await this.service.findAll(context.userId);
    return res;
  }

  @Post()
  @ApiOperation({ summary: 'Create Expense Report' })
  async createExpenseReport(
    @Body() createExpenseReportInput: CreateExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<ExpenseReport> {
    return await this.service.create(context.userId, createExpenseReportInput);
  }

  @Get(':forMonth/:forYear')
  @ApiOperation({ summary: 'FindOne Expense Report' })
  async findOneExpenseReport(
    @MFContext() context: RequestContext,
    @Param() findOneExpenseReportInput: FindOneExpenseReportInput,
  ): Promise<ExpenseReport> {
    const res = await this.service.findByMonthAndYear(
      context.userId,
      findOneExpenseReportInput,
    );
    return res;
  }

  @Put()
  @ApiOperation({ summary: 'Update Expense Report' })
  async updateExpenseReport(
    @Body() updateExpenseReportInput: UpdateExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<BulkOperationOutput> {
    return await this.service.update(updateExpenseReportInput, context.userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Expense Report' })
  async deleteExpenseReport(
    @Body() deleteExpenseReportInput: DeleteExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<BulkOperationOutput> {
    return await this.service.delete(deleteExpenseReportInput, context.userId);
  }

  @Post('insert')
  @ApiOperation({ summary: 'Insert data into Expense Report' })
  async insertExpenseReport(
    @Body() insertExpenseReport: InsertExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<BulkOperationOutput> {
    return await this.service.insert(insertExpenseReport, context.userId);
  }
}
