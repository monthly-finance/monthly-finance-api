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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiResponse({
    status: 200,
    description: 'List of expense reports retrieved successfully',
    type: () => ExpenseReport,
    isArray: true,
  })
  async findAllExpenseReport(
    @MFContext() context: RequestContext,
  ): Promise<ExpenseReport[]> {
    return this.service.findAll(context.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create Expense Report' })
  @ApiResponse({
    status: 201,
    description: 'Expense report created successfully',
    type: ExpenseReport,
  })
  async createExpenseReport(
    @Body() createExpenseReportInput: CreateExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<ExpenseReport> {
    return this.service.create(context.userId, createExpenseReportInput);
  }

  @Get(':forMonth/:forYear')
  @ApiOperation({ summary: 'Find One Expense Report' })
  @ApiResponse({
    status: 200,
    description: 'Expense report retrieved successfully',
    type: ExpenseReport,
  })
  async findOneExpenseReport(
    @MFContext() context: RequestContext,
    @Param() findOneExpenseReportInput: FindOneExpenseReportInput,
  ): Promise<ExpenseReport> {
    return this.service.findByMonthAndYear(
      context.userId,
      findOneExpenseReportInput,
    );
  }

  @Put()
  @ApiOperation({ summary: 'Update Expense Report' })
  @ApiResponse({
    status: 200,
    description: 'Expense report updated successfully',
    type: BulkOperationOutput,
  })
  async updateExpenseReport(
    @Body() updateExpenseReportInput: UpdateExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<BulkOperationOutput> {
    return this.service.update(updateExpenseReportInput, context.userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Expense Report' })
  @ApiResponse({
    status: 200,
    description: 'Expense report deleted successfully',
    type: BulkOperationOutput,
  })
  async deleteExpenseReport(
    @Body() deleteExpenseReportInput: DeleteExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<BulkOperationOutput> {
    return this.service.delete(deleteExpenseReportInput, context.userId);
  }

  @Post('insert')
  @ApiOperation({ summary: 'Insert Data into Expense Report' })
  @ApiResponse({
    status: 201,
    description: 'Data inserted into expense report successfully',
    type: BulkOperationOutput,
  })
  async insertExpenseReport(
    @Body() insertExpenseReport: InsertExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<BulkOperationOutput> {
    return this.service.insert(insertExpenseReport, context.userId);
  }
}
