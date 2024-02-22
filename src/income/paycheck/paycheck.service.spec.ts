import { Test, TestingModule } from '@nestjs/testing';
import { PaycheckService } from './paycheck.service';

describe('PaycheckService', () => {
  let service: PaycheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaycheckService],
    }).compile();

    service = module.get<PaycheckService>(PaycheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
