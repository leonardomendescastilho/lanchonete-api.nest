import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class GetUsersDto {
  @IsString()
  @IsEmail()
  email: string;
}

export class UserId {
  @IsNotEmpty()
  _id: string;
}


export class AddressDto {
  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zip?: string;
}


export class HistoryDto {
  @IsOptional()
  orderId?: ObjectId;

  @IsDate()
  @IsOptional()
  purchaseDate?: Date;

  @IsNumber()
  @IsOptional()
  totalAmount?: number;
}

export class UsersDto {
  @IsString()
  _id: ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @Type(() => HistoryDto)
  @ValidateNested()
  purchaseHistory: HistoryDto[];

  @Type(() => AddressDto)
  @ValidateNested()
  address: AddressDto;
}

export class UserUpdateDataDto extends UserId {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @Type(() => AddressDto)
  @ValidateNested()
  address: AddressDto;
}
  