import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IncomeReportDto } from './dtos/income.common.dto';
import {
  CreateIncomeReportInput,
  DeleteIncomeReportInput,
  FindOneIncomeReportInput,
  InsertIncomeReportInput,
  UpdateIncomeReportInput,
} from './dtos/income.input.dto';
import { IncomeReport } from './entities/income-report.entity';
import { MFContext } from 'src/shared/types/types';
import { IncomeReportService } from './income-report.service';
import { BulkOperationOutput } from 'src/shared/dto/common.dto';

@Controller('income/income-report')
@ApiBearerAuth()
@ApiTags('Income Report')
@UseInterceptors(ClassSerializerInterceptor)
export class IncomeReportController {
  constructor(private service: IncomeReportService) {}

  @Get()
  @ApiOperation({ summary: 'Find All Income Reports' })
  @ApiResponse({
    status: 200,
    description: 'List of income reports retrieved successfully',
    type: () => IncomeReport,
    isArray: true,
  })
  async findAllIncomeReport(
    @MFContext('userId') userId: string,
  ): Promise<IncomeReport[]> {
    return await this.service.findAll(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create Income Report' })
  @ApiResponse({
    status: 201,
    description: 'Income report created successfully',
    type: IncomeReport,
  })
  async createIncomeReport(
    @MFContext('userId') userId: string,
    @Body() createIncomeReportInput: CreateIncomeReportInput,
  ): Promise<IncomeReport> {
    return await this.service.create(userId, createIncomeReportInput);
  }

  @Get(':forMonth/:forYear')
  @ApiOperation({ summary: 'Find One Income Report' })
  @ApiResponse({
    status: 200,
    description: 'Income report retrieved successfully',
    type: IncomeReport,
  })
  async findOneIncomeReport(
    @MFContext('userId') userId: string,
    @Param() findOneIncomeReportInput: FindOneIncomeReportInput,
  ): Promise<IncomeReport> {
    return await this.service.findOne(userId, findOneIncomeReportInput);
  }

  @Put(':reportId')
  @ApiOperation({ summary: 'Update Income Report' })
  @ApiResponse({
    status: 200,
    description: 'Income report updated successfully',
    type: BulkOperationOutput,
  })
  @ApiParam({
    name: 'reportId',
    required: true,
    type: Number,
    description: 'The ID of the income report to update',
  })
  async updateIncomeReport(
    @Body() updateIncomeReportInput: UpdateIncomeReportInput,
    @MFContext('userId') userId: string,
    @Param() params: { reportId: number },
  ): Promise<BulkOperationOutput> {
    return await this.service.update(
      userId,
      params.reportId,
      updateIncomeReportInput,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Income Report' })
  @ApiResponse({
    status: 200,
    description: 'Income report deleted successfully',
    type: BulkOperationOutput,
  })
  async deleteIncomeReport(
    @Body() deleteIncomeReportInput: DeleteIncomeReportInput,
    @MFContext('userId') userId: string,
  ): Promise<BulkOperationOutput> {
    return await this.service.delete(userId, deleteIncomeReportInput);
  }

  @Post('insert')
  @ApiOperation({ summary: 'Insert Data into Income Report' })
  @ApiResponse({
    status: 201,
    description: 'Data inserted into income report successfully',
    type: BulkOperationOutput,
  })
  async insertExpenseReport(
    @Body() insertExpenseReport: InsertIncomeReportInput,
    @MFContext('userId') userId: string,
  ): Promise<BulkOperationOutput> {
    return await this.service.insert(userId, insertExpenseReport);
  }
}
