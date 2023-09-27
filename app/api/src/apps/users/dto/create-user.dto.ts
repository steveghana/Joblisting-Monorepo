import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is required',
  })
  username: string;
  @IsNotEmpty({
    message: 'firstname is required',
  })
  firstName: string;
  @IsNotEmpty({
    message: 'lastName is required',
  })
  lastName: string;

  @IsString({
    message: 'Email must be a string',
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: 'Role is required',
  })
  role: string;
}
