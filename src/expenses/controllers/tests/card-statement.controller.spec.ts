import { Test, TestingModule } from '@nestjs/testing';
import { CardStatementController } from '../card-statement.controller';

describe('CardStatementController', () => {
  let controller: CardStatementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardStatementController],
    }).compile();

    controller = module.get<CardStatementController>(CardStatementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
