import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

//making sure dto is a class, not other type
interface ClassConstructor {
  new (...args: any[]): object;
}

//Decorators are just plain functions - @Serialize(dto)
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    _context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //request handler
    console.log("I'm running before the request");

    //response handler
    return handler.handle().pipe(
      map((data: any) => {
        //turn user intity into an instance of UserDto
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, //must add to make everyting works correctly
        });
      }),
    );
  }
}
