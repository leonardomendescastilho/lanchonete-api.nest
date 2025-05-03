import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class AddressDto {
  @IsString({ message: 'Street must be a string' })
  @MinLength(5, { message: 'Street must be at least 5 character long' })
  @MaxLength(20, { message: 'Street must be at most 20 characters long' })
  street: string;

  @IsString({ message: 'City must be a string' })
  @MinLength(2, { message: 'City must be at least 2 character long' })
  @MaxLength(20, { message: 'City must be at most 20 characters long' })
  city: string;

  @IsString({ message: 'State must be a string' })
  @MinLength(2, { message: 'State must be at least 2 character long' })
  @MaxLength(20, { message: 'State must be at most 20 characters long' })
  state: string;

  @IsString({ message: 'Zip must be a string' })
  @MinLength(5, { message: 'Zip must be at least 5 character long' })
  @MaxLength(10, { message: 'Zip must be at most 20 characters long' })
  zip: string;
}

export class CreateUsersDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 character long' })
  @MaxLength(20, { message: 'Name must be at most 20 characters long' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsPhoneNumber('BR', { message: 'Phone must be a valid phone number' })
  phone: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
