import * as bcrypt from 'bcrypt';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CheckAuthDto } from './dto/check-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../index.models';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  async signUp(createAuthDto: CreateAuthDto) {
    try {
      const hash = await bcrypt.hash(createAuthDto.password, 10);
      const newUser = await this.userRepository.create({
        ...createAuthDto,
        password: hash,
      });

      const token = this.generateToken(newUser.id, newUser.email);

      return token;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const { path } = error.errors[0];
        if (path === 'email')
          throw new ForbiddenException('email already in use');
        else throw new ForbiddenException('username already in use');
      } else throw error;
    }
  }

  async signIn(checkAuthDto: CheckAuthDto) {
    const user = await User.findOne({ where: { email: checkAuthDto.email } });

    if (!user) throw new ForbiddenException('incorrect email or password');

    const isPasswordCorrect = await bcrypt.compare(
      checkAuthDto.password,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new ForbiddenException('incorrect email or password');

    const token = this.generateToken(user.id, user.email);

    return token;
  }

  async generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_KEY');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '365d',
      secret,
    });

    return { access_token };
  }
}
