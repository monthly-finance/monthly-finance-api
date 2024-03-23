import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { CardStatementService } from '../services/card-statement.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateCardEndOfMonthStatementInput,
  UpdateCardEndOfMonthStatementInput,
  DeleteCardEndOfMonthStatementInput,
} from '../dtos/expense.input.dto';
import { MFContext } from 'src/shared/types/types';
import { RequestContext } from 'src/auth/types/auth.type';

@Controller('expense/card-statement')
@ApiBearerAuth()
@ApiTags('Card Statement')
export class CardStatementController {
  constructor(private service: CardStatementService) {}

  @Post()
  @ApiOperation({ summary: 'Add Card Statement Report' })
  async create(
    @Body()
    createCardEndOfMonthStatementInput: CreateCardEndOfMonthStatementInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.addStatement(
      createCardEndOfMonthStatementInput,
      context.userId,
    );
  }

  @Put()
  @ApiOperation({ summary: 'Update Card Statement Report' })
  async update(
    @Body()
    updateCardEndOfMonthStatementInput: UpdateCardEndOfMonthStatementInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.updateStatement(
      updateCardEndOfMonthStatementInput,
      context.userId,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Card Statement Report' })
  async deleteCard(
    @Body()
    deleteCardEndOfMonthStatementInput: DeleteCardEndOfMonthStatementInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.deleteStatement(
      deleteCardEndOfMonthStatementInput,
      context.userId,
    );
  }
}
