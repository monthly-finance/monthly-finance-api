import { Body, Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { IncomeReportService } from './income-report.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IncomeReportDto } from '../dtos/income.common.dto';
import {
  CreateIncomeReportInput,
  DeleteIncomeReportInput,
  FindOneIncomeReportInput,
  UpdateIncomeReportInput,
} from '../dtos/income.input.dto';
import { IncomeReport } from '../entities/income-report.entity';
import { MFContext } from 'src/shared/types/types';

@Controller('income/income-report')
@ApiBearerAuth()
@ApiTags('Income Report')
export class IncomeReportController {
  constructor(private service: IncomeReportService) {}

  @Get()
  @ApiOperation({ summary: 'Find All Income Reports' })
  async findAllIncomeReport(
    @MFContext('userId') userId: string,
  ): Promise<IncomeReportDto[]> {
    const res = await this.service.findAll(userId);
    return res;
  }

  @Post()
  @ApiOperation({ summary: 'Create Income Report' })
  async createIncomeReport(
    @MFContext('userId') userId: string,
    @Body() createIncomeReportInput: CreateIncomeReportInput,
  ): Promise<void> {
    return await this.service.create(userId, createIncomeReportInput);
  }

  @Post('findOne')
  @ApiOperation({ summary: 'FindOne Income Report' })
  async findOneIncomeReport(
    @MFContext('userId') userId: string,
    @Body() findOneIncomeReportInput: FindOneIncomeReportInput,
  ): Promise<IncomeReport> {
    return await this.service.findOne(userId, findOneIncomeReportInput);
  }

  @Put()
  @ApiOperation({ summary: 'Update Income Report' })
  async updateIncomeReport(
    @Body() updateIncomeReportInput: UpdateIncomeReportInput,
    @MFContext('userId') userId: string,
  ): Promise<void> {
    return await this.service.update(userId, updateIncomeReportInput);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Income Report' })
  async deleteIncomeReport(
    @Body() deleteIncomeReportInput: DeleteIncomeReportInput,
    @MFContext('userId') userId: string,
  ): Promise<void> {
    return await this.service.delete(userId, deleteIncomeReportInput);
  }
}
