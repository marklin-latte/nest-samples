import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorService } from './service/creator.service';
import { CreatorController } from './controller/creator.controller';
import { Creator } from './entity/creator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creator])],
  providers: [CreatorService],
  controllers: [CreatorController],
})
export class CreatorModule {}
