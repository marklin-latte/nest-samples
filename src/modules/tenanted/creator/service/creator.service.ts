import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateCreatorDto } from '../dto/create-creator.dto';
import { CONNECTION } from '../../../../constants/tenancy';
import { Creator } from '../entity/creator.entity';

@Injectable()
export class CreatorService {
  private usersRepository: Repository<Creator>;

  constructor(@Inject(CONNECTION) connection: DataSource) {
    this.usersRepository = connection.getRepository(Creator);
  }

  async createCreator(user: CreateCreatorDto): Promise<Creator> {
    const userEntity: Creator = new Creator();
    userEntity.username = user.username;
    userEntity.email = user.email;
    userEntity.age = user.age;
    const result = await this.usersRepository.save(userEntity);
    return result;
  }
}
