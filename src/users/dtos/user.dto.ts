import { Expose } from 'class-transformer';

export class UserDto {
  @Expose() //exposing the propertie - we show them in the response
  id: string;

  @Expose() //exposing the propertie - we show them in the response
  email: string;
}
