import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controller/app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

describe('AppController', () => {
  let appService: AppService;
  let testModule: TestingModule;

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = testModule.get<AppService>(AppService);
  });

  describe('AppService', () => {
    it('should return success in get users"', async () => {
      const params = {
        since: 5,
        perPage: 2,
      };

      const serviceResponse = appService.getUsers(params);
      await expect(serviceResponse).toHaveProperty('data');
    });
  });
});
