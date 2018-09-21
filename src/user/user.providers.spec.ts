import { Test, TestingModule } from '@nestjs/testing';
import { User.Providers } from './user.providers';

describe('User.Providers', () => {
  let provider: User.Providers;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User.Providers],
    }).compile();
    provider = module.get<User.Providers>(User.Providers);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
