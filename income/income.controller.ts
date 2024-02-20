import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Delete,
  Put,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MFHeader } from 'src/shared/dto/common.dto';
import { IncomeReportDto } from './dtos/income.common.dto';
import {
  CreateIncomeReportInput,
  DeleteIncomeReportInput,
  FindOneIncomeReportInput,
  UpdateIncomeReportInput,
} from './dtos/income.input.dto';
import { IncomeReport } from './entities/income-report.entity';

@Controller('income')
@ApiTags('Income Report')
export class IncomeController {
  constructor(private service: IncomeService) {}

  // @Get()
  // @ApiOperation({ summary: 'Find All Income Reports' })
  // async findAllIncomeReport(
  //   @Headers() headers: MFHeader,
  // ): Promise<IncomeReportDto[]> {
  //   const res = await this.service.findAll(headers.userid);
  //   return res;
  // }

  // @Post()
  // @ApiOperation({ summary: 'Create Income Report' })
  // async createIncomeReport(
  //   @Headers() headers: MFHeader,
  //   @Body() createIncomeReportInput: CreateIncomeReportInput,
  // ): Promise<void> {
  //   return await this.service.create(headers.userid, createIncomeReportInput);
  // }

  // @Post('findOne')
  // @ApiOperation({ summary: 'FindOne Income Report' })
  // async findOneIncomeReport(
  //   @Headers() headers: MFHeader,
  //   @Body() findOneIncomeReportInput: FindOneIncomeReportInput,
  // ): Promise<IncomeReport> {
  //   return await this.service.findOne(headers.userid, findOneIncomeReportInput);
  // }

  // @Put()
  // @ApiOperation({ summary: 'Update Income Report' })
  // async updateIncomeReport(
  //   @Body() updateIncomeReportInput: UpdateIncomeReportInput,
  // ): Promise<void> {
  //   return await this.service.update(updateIncomeReportInput);
  // }

  // @Delete()
  // @ApiOperation({ summary: 'Delete Income Report' })
  // async deleteIncomeReport(
  //   @Body() deleteIncomeReportInput: DeleteIncomeReportInput,
  // ): Promise<void> {
  //   return await this.service.delete(deleteIncomeReportInput);
  // }
}
