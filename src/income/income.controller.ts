import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { IncomeService } from './income.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MFHeader } from 'src/shared/dto/common.dto';
import { IncomeReportDto } from './dtos/income.common.dto';
import { CreateIncomeReportInput } from './dtos/income.input.dto';

@Controller('income')
@ApiTags('Income Report')
export class IncomeController {
  constructor(private service: IncomeService) {}

  @Post()
  @ApiOperation({ summary: 'Create Income Report' })
  async createIncomeReport(
    @Headers() headers: MFHeader,
    @Body() createIncomeReportInput: CreateIncomeReportInput,
  ): Promise<void> {
    return await this.service.create(headers.userid, createIncomeReportInput);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Income Reports' })
  async findAllIncomeReport(
    @Headers() headers: MFHeader,
  ): Promise<IncomeReportDto[]> {
    const res = await this.service.findAll(headers.userid);
    return res;
  }
}
