import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let serviceCreateUserMock: jest.Mock;

  beforeEach(async () => {
    serviceCreateUserMock = jest.fn().mockResolvedValue({});
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: serviceCreateUserMock,
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should call once createUser of user service, and return user', async () => {
    // Arange
    const newUser: CreateUserDto = new CreateUserDto();
    newUser.username = 'mark test';
    serviceCreateUserMock.mockResolvedValue({
      username: newUser.username,
    });

    // Act
    const result: any = await controller.createUser(newUser);

    // Assert
    expect(result.username).toEqual(newUser.username);
  });
});
