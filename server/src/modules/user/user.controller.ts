import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationParamPipe } from '../../core/Pipes';
import { JwtAuthGuard } from '../auth/strategy';
import { GetUser } from '../auth/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@GetUser() userId: number) {
    return this.userService.getUser(userId);
  }

  @Get(':id')
  checkUser(@Param('id', ValidationParamPipe) id: string) {
    return this.userService.checkUser(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidationParamPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
