import { Test, TestingModule } from '@nestjs/testing';
import { Database.Provider } from './database.provider';

describe('Database.Provider', () => {
  let provider: Database.Provider;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Database.Provider],
    }).compile();
    provider = module.get<Database.Provider>(Database.Provider);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
