import { Test, TestingModule } from '@nestjs/testing';
import { CreatorController } from './creator.controller';
import { CreatorService } from '../service/creator.service';
import { CreateCreatorDto } from '../dto/create-creator.dto';

describe('CreatorController', () => {
  let controller: CreatorController;
  let serviceCreateCreatorMock: jest.Mock;

  beforeEach(async () => {
    serviceCreateCreatorMock = jest.fn().mockResolvedValue({});
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorController],
      providers: [
        {
          provide: CreatorService,
          useValue: {
            createCreator: serviceCreateCreatorMock,
          },
        },
      ],
    }).compile();

    controller = module.get<CreatorController>(CreatorController);
  });

  it('should call once createCreator of user service, and return user', async () => {
    // Arange
    const newCreator: CreateCreatorDto = new CreateCreatorDto();
    newCreator.username = 'mark test';
    serviceCreateCreatorMock.mockResolvedValue({
      username: newCreator.username,
    });

    // Act
    const result: any = await controller.createCreator(newCreator);

    // Assert
    expect(result.username).toEqual(newCreator.username);
  });
});
