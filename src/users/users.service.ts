import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    private slatRounds = 10;
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly profilesService: ProfilesService) {}

    async insertUser(createUserDto: CreateUserDto): Promise<User> {
        let profile: Profile = null;

        if(createUserDto.profile) {
            profile = await this.profilesService.insertProfile(createUserDto.profile);
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, this.slatRounds);
        const user = this.usersRepository.create({
            'username': createUserDto.username,
            'password': hashedPassword,
            'name': createUserDto.name,
            'profile': profile
        });
        try {
            return await this.usersRepository.save(user);
        } catch (error) {
            // MySQL specific error code
            // Postgre: if(error.code === '23505') {
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exists');
            }
            else {
                throw new InternalServerErrorException('An internal server error while creating user');
            }
        }
    } 

    async findUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ['profile', 'photos']});
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({where: {id}, relations: ['profile', 'photos']});
        if(!user) throw new NotFoundException('ID not found');
        return {...user};
    }

    async findUserByEmail(username: string): Promise<User> {
        const user = await this.usersRepository.findOne({where: {username}});
        // TODO: Remove throw stmt - handled in the caller
        // if(!user) throw new NotFoundException('Email not found');
        return {...user};
    }
}
