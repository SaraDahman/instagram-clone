import { PartialType } from '@nestjs/mapped-types';
import { CreateViewerDto } from './create-viewer.dto';

export class UpdateViewerDto extends PartialType(CreateViewerDto) {}
