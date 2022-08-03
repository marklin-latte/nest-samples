import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const userEntity: User = this.usersRepository.create({
      username: user.username,
      email: user.email,
      age: user.age,
    });
    const result = await this.usersRepository.save(userEntity);
    return result;
  }
  // updateUserBaseInfo(): void {}
  // disableUser(): void {}
  // modifyUserPermission(): void {}
}
