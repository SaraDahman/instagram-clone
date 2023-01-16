import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationParamPipe } from '../../core/Pipes';
import { JwtAuthGuard } from '../auth/strategy';
import { GetUser } from '../auth/decorator/user.decorator';
import { UsernameParamValidation } from '../../core/Pipes/UsernameParamValidation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@GetUser() userId: number) {
    return this.userService.getUser(userId);
  }

  @Get(':username')
  getUserData(@Param('username', UsernameParamValidation) username: string) {
    return this.userService.findUserProfileInfo(username);
  }

  @Get(':id')
  checkUser(@Param('id', ValidationParamPipe) id: string) {
    return this.userService.checkUser(+id);
  }
}
