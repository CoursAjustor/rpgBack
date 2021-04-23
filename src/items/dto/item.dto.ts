import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Class } from '../../users/interfaces/user.interface';
import { ItemTypes } from '../interface/item.interface';

export class CreateItemDto {
  @IsString()
  name!: string;

  @IsString()
  @IsEnum(ItemTypes)
  type!: ItemTypes;

  @IsNumber()
  @IsOptional()
  effect?: number;

  @IsString()
  @IsEnum(Class)
  @IsOptional()
  restricted?: Class;
}
