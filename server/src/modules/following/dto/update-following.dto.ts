import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowingDto } from './create-following.dto';

export class UpdateFollowingDto extends PartialType(CreateFollowingDto) {}
