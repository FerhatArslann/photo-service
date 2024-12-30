import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/users/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private readonly profilesRepository: Repository<Profile>) {}

    async insertProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
        const profile: Profile = new Profile();
        profile.gender = createProfileDto.gender;
        profile.photo = createProfileDto.photo;
        return await this.profilesRepository.save(profile);
    }
}
