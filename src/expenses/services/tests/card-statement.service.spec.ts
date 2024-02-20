import { Test, TestingModule } from '@nestjs/testing';
import { CardStatementService } from '../card-statement.service';

describe('CardStatementService', () => {
  let service: CardStatementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardStatementService],
    }).compile();

    service = module.get<CardStatementService>(CardStatementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
