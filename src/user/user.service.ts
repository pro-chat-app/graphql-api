import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { StatusEnum, UserEntity } from './entities/user.entity';

const saltOrRound = 12;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ email });
  }

  async create(createUserInput: CreateUserInput) {
    const user = new UserEntity();

    user.email = createUserInput.email;
    user.firstName = createUserInput.firstName;
    user.lastName = createUserInput.lastName;
    user.birthday = createUserInput.birthday;
    user.username = createUserInput.username;
    user.password = await bcrypt.hash(createUserInput.password, saltOrRound);
    user.status = StatusEnum.DISCONNECTED;

    return await this.userRepository.save(user);
  }

  async createDefaultAdminUser(createUserInput: CreateUserInput) {
    const adminUsers = await this.userRepository.find({
      where: {
        isAdmin: true,
      },
    });

    if (adminUsers.length > 0) {
      throw new ForbiddenException();
    }

    const user = new UserEntity();

    user.email = createUserInput.email;
    user.firstName = createUserInput.firstName;
    user.lastName = createUserInput.lastName;
    user.birthday = createUserInput.birthday;
    user.username = createUserInput.username;
    user.password = await bcrypt.hash(createUserInput.password, saltOrRound);
    user.status = StatusEnum.DISCONNECTED;
    user.isAdmin = true;

    return await this.userRepository.save(user);
  }
}
