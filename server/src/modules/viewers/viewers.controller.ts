import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';

@Controller('viewers')
export class ViewersController {
  constructor(private readonly viewersService: ViewersService) {}

  @Post()
  create(@Body() createViewerDto: CreateViewerDto) {
    return this.viewersService.create(createViewerDto);
  }

  @Get()
  findAll() {
    return this.viewersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewerDto: UpdateViewerDto) {
    return this.viewersService.update(+id, updateViewerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewersService.remove(+id);
  }
}
