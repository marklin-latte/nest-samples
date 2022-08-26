import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OWNER } from '../../../../constants/tenancy';

export class AdminCreateTenantOutputDto {
  @ApiProperty({
    description: 'Tenant 編號',
    example: 'ab6c6581-f0bc-4b9b-83fe-f138e73a945f ',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Tenant 名稱',
    example: 'Tenant A',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Tenant 擁有者',
    example: `${OWNER['2C']}`,
  })
  @IsNotEmpty()
  @IsEnum(OWNER)
  owner: OWNER;

  @ApiProperty({
    description: 'tenant 建立時間',
    example: new Date(),
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    description: 'tenant 更新時間',
    example: new Date(),
  })
  @IsNotEmpty()
  updatedAt: Date;
}
