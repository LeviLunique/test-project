import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, userUpdates: Partial<User>): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    const updatedUser = Object.assign(user, userUpdates);
    return this.userRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
