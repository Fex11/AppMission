import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, } from 'class-validator';
export class CreerUserDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: "Le titre est obligatoire" })
  @IsString()
  username!: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  password!: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  email!: string;

  @IsNotEmpty()
  roles!: [];


}
  