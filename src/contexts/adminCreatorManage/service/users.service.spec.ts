import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserEntity;
  let repositorySaveMock: jest.Mock;

  beforeEach(async () => {
    mockUserEntity = new User();
    mockUserEntity.username = 'test';
    mockUserEntity.email = 'test@hahow.in';
    mockUserEntity.age = 18;

    repositorySaveMock = jest.fn().mockResolvedValue(mockUserEntity);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(mockUserEntity),
            save: repositorySaveMock,
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should successfully create new creator', async () => {
    // Arrange
    const newUser = new CreateUserDto();
    newUser.username = 'mark';
    newUser.password = '12345';
    newUser.email = 'mark@hahow.in';

    const userEntity = new User();
    userEntity.username = newUser.username;
    userEntity.email = newUser.email;

    repositorySaveMock.mockResolvedValue(userEntity);

    // Act
    const result: User = await service.createUser(newUser);

    // Assert
    expect({
      username: result.username,
      email: result.email,
    }).toEqual({
      username: newUser.username,
      email: newUser.email,
    });
  });
});
