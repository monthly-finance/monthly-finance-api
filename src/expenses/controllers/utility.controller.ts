import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateUtilityInput,
  UpdateUtilityInput,
  DeleteUtilityInput,
} from '../dtos/expense.input.dto';
import { UtilityService } from '../services/utility.service';
import { RequestContext } from 'src/auth/types/auth.type';
import { MFContext } from 'src/shared/types/types';
import { Utility } from '../entities/utility/utility.entity';

@Controller('expense/utility')
@ApiBearerAuth()
@ApiTags('Utility')
@UseInterceptors(ClassSerializerInterceptor)
export class UtilityController {
  constructor(private service: UtilityService) {}

  @Post()
  @ApiOperation({ summary: 'Add Utility' })
  async create(
    @Body()
    createUtilityInput: CreateUtilityInput,
    @MFContext() context: RequestContext,
  ): Promise<Utility> {
    return await this.service.addUtility(createUtilityInput, context.userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update Utility' })
  async updateExpenseReport(
    @Body()
    updateUtilityInput: UpdateUtilityInput,
    @MFContext() context: RequestContext,
  ): Promise<Utility> {
    return await this.service.updateUtility(updateUtilityInput, context.userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Utility' })
  async deleteExpenseReport(
    @Body()
    deleteUtilityInput: DeleteUtilityInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.deleteUtility(deleteUtilityInput, context.userId);
  }
}
