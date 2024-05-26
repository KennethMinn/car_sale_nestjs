import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  //@InjectRepository is added because of Genric that types repo
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async find(email?: string) {
    return await this.repo.find({ where: { email } });
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  //Partial<User> - all the properties in body can be optionl - body : {email ?: string; password ?: string}
  async update(id: number, body: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    //Object.assign mutates the original user obj
    Object.assign(user, body); // {...user,...body}

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.repo.remove(user);
  }
}
