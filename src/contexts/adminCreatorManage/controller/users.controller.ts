import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<any> {
    const result: User = await this.usersService.createUser(newUser);
    return {
      username: result.username,
    };
  }
}
