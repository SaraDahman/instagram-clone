import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UsernameParamValidation implements PipeTransform {
  async transform(value: string, metadata: ArgumentMetadata) {
    if (!isNaN(Number(value))) {
      throw new BadRequestException('expected params that contain letters');
    }
    return value;
  }
}
