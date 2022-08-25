import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OWNER } from '../../../../constants/tenancy';

export class CreateTenantInputDto {
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
}
