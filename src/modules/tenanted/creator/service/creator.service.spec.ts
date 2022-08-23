import { Test, TestingModule } from '@nestjs/testing';
import { CreatorService } from './creator.service';
import { CreateCreatorDto } from '../dto/create-creator.dto';
import { CONNECTION } from '../../../../constns/tenancy';
import { Creator } from '../entity/creator.entity';

describe('CreatorService', () => {
  let service: CreatorService;
  let mockCreatorEntity;
  let repositorySaveMock: jest.Mock;

  beforeEach(async () => {
    mockCreatorEntity = new Creator();
    mockCreatorEntity.username = 'test';
    mockCreatorEntity.email = 'test@hahow.in';
    mockCreatorEntity.age = 18;

    repositorySaveMock = jest.fn().mockResolvedValue(mockCreatorEntity);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatorService,
        {
          provide: CONNECTION,
          useValue: {
            getRepository: jest.fn().mockReturnValue({
              save: repositorySaveMock,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CreatorService>(CreatorService);
  });

  it('should successfully create new creator', async () => {
    // Arrange
    const newCreator = new CreateCreatorDto();
    newCreator.username = 'mark';
    newCreator.password = '12345';
    newCreator.email = 'mark@hahow.in';

    const userEntity = new Creator();
    userEntity.username = newCreator.username;
    userEntity.email = newCreator.email;

    repositorySaveMock.mockResolvedValue(userEntity);

    // Act
    const result: Creator = await service.createCreator(newCreator);

    // Assert
    expect({
      username: result.username,
      email: result.email,
    }).toEqual({
      username: newCreator.username,
      email: newCreator.email,
    });
  });
});
