import { Test, TestingModule } from '@nestjs/testing';
import { MissionsGateway } from './missions.gateway';

describe('MissionsGateway', () => {
  let gateway: MissionsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionsGateway],
    }).compile();

    gateway = module.get<MissionsGateway>(MissionsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
