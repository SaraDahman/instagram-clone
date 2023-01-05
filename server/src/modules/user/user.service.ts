import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async checkUser(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new NotFoundException();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      attributes: ['id', 'name', 'username', 'email', 'image'],
      where: { id },
    });
    if (!user) throw new NotFoundException();

    return user;
  }
}
