import { Injectable } from '@nestjs/common';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';

@Injectable()
export class ViewersService {
  create(createViewerDto: CreateViewerDto) {
    return 'This action adds a new viewer';
  }

  findAll() {
    return `This action returns all viewers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viewer`;
  }

  update(id: number, updateViewerDto: UpdateViewerDto) {
    return `This action updates a #${id} viewer`;
  }

  remove(id: number) {
    return `This action removes a #${id} viewer`;
  }
}
