import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo) private readonly photosRepository: Repository<Photo>,
        private readonly usersService: UsersService,
        private readonly categoriesService: CategoriesService
    ) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const user = await this.usersService.findUserByEmail(createPhotoDto.owner);
        if (!user) throw new NotFoundException('Owner not found');
        
        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.location = createPhotoDto.location;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;

        // Handle categories
        if (createPhotoDto.categories && createPhotoDto.categories.length > 0) {
            photo.categories = [];
            for (const categoryId of createPhotoDto.categories) {
                try {
                    const category = await this.categoriesService.findOne(categoryId);
                    if (category) {
                        photo.categories.push(category);
                    }
                } catch (error) {
                    // Jos kategoriaa ei löydy ID:llä, kokeillaan nimeä
                    const categories = await this.categoriesService.findAll();
                    const category = categories.find(c => c.name === categoryId);
                    if (category) {
                        photo.categories.push(category);
                    }
                }
            }
        }

        return await this.photosRepository.save(photo);
    }

    async getPhotos(): Promise<Photo[]> {
        const photos = await this.photosRepository.find({
            relations: ['user', 'categories']
        });
        return photos.map(photo => {
            if (photo.user) {
                const { password, ...userWithoutPassword } = photo.user;
                photo.user = userWithoutPassword as User;
            }
            return photo;
        });
    }

    async getPhotoById(id: string): Promise<Photo> {
        const photo = await this.photosRepository.findOne({
            where: { id },
            relations: ['user', 'categories']
        });
        if (!photo) {
            throw new NotFoundException(`Photo with ID ${id} not found`);
        }
        if (photo.user) {
            const { password, ...userWithoutPassword } = photo.user;
            photo.user = userWithoutPassword as User;
        }
        return photo;
    }

    async updatePhoto(id: string, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        const photo = await this.getPhotoById(id);
        
        if (updatePhotoDto.name) photo.name = updatePhotoDto.name;
        if (updatePhotoDto.location) photo.location = updatePhotoDto.location;
        if (updatePhotoDto.description) photo.description = updatePhotoDto.description;
        if (updatePhotoDto.url) photo.url = updatePhotoDto.url;

        // Update categories if provided
        if (updatePhotoDto.categories) {
            photo.categories = [];
            for (const categoryName of updatePhotoDto.categories) {
                const category = await this.categoriesService.findOne(categoryName);
                if (category) {
                    photo.categories.push(category);
                }
            }
        }

        return await this.photosRepository.save(photo);
    }

    async deletePhoto(id: string): Promise<void> {
        const result = await this.photosRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Photo with ID ${id} not found`);
        }
    }
}
