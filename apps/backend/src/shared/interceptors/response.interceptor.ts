import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>) {
    return next.handle().pipe(
      map((data) => ({
        status: 'Success',
        code: context.switchToHttp().getResponse().statusCode,
        data: data || null,
        message: '',
      })),
    );
  }
}
