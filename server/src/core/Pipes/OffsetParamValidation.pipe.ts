import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OffsetParamValidation implements PipeTransform {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value);
    if (isNaN(val) || val < 0) {
      throw new BadRequestException(
        'expected offset to be a number and more than zero',
      );
    }
    return val;
  }
}
