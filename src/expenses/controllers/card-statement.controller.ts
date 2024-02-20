import { Body, Controller, Delete, Post, Put, Headers } from '@nestjs/common';
import { CardStatementService } from '../services/card-statement.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateCardEndOfMonthStatementInput,
  UpdateCardEndOfMonthStatementInput,
  DeleteCardEndOfMonthStatementInput,
} from '../dtos/expense.input.dto';

@Controller('card-statement')
@ApiTags('Card Statement')
export class CardStatementController {
  constructor(private service: CardStatementService) {}

  @Post()
  @ApiOperation({ summary: 'Add Card Statement Report' })
  async create(
    @Body()
    createCardEndOfMonthStatementInput: CreateCardEndOfMonthStatementInput,
  ): Promise<void> {
    return await this.service.addStatement(createCardEndOfMonthStatementInput);
  }

  @Put()
  @ApiOperation({ summary: 'Update Card Statement Report' })
  async updateExpenseReport(
    @Body()
    updateCardEndOfMonthStatementInput: UpdateCardEndOfMonthStatementInput,
  ): Promise<void> {
    return await this.service.updateStatement(
      updateCardEndOfMonthStatementInput,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Card Statement Report' })
  async deleteExpenseReport(
    @Body()
    deleteCardEndOfMonthStatementInput: DeleteCardEndOfMonthStatementInput,
  ): Promise<void> {
    return await this.service.deleteStatement(
      deleteCardEndOfMonthStatementInput,
    );
  }
}
