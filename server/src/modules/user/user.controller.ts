import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationParamPipe } from '../../core/Pipes';
import { JwtAuthGuard } from '../auth/strategy';
import { GetUser } from '../auth/decorator/user.decorator';
import { UsernameParamValidation } from '../../core/Pipes/UsernameParamValidation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@GetUser() userId: number) {
    return this.userService.getUser(userId);
  }

  @Get(':username')
  getUserData(
    @Param('username', new UsernameParamValidation()) username: string,
  ) {
    return this.userService.findUserProfileInfo(username);
  }

  @Get(':id')
  checkUser(@Param('id', new ValidationParamPipe()) id: number) {
    return this.userService.checkUser(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ValidationParamPipe()) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }
}
