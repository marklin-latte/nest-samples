import { Controller, Post, Body } from '@nestjs/common';
import { CreatorService } from '../service/creator.service';
import { CreateCreatorDto } from '../dto/create-creator.dto';
import { Creator } from '../entity/creator.entity';

@Controller('users')
export class CreatorController {
  constructor(private readonly usersService: CreatorService) {}

  @Post()
  async createCreator(@Body() newCreator: CreateCreatorDto): Promise<any> {
    const result: Creator = await this.usersService.createCreator(newCreator);
    return {
      username: result.username,
    };
  }
}
