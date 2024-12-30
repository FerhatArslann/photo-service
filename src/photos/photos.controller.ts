import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new photo' })
    @ApiResponse({ status: 201, description: 'Photo has been created successfully.' })
    async createPhotoUsingEmail(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all photos' })
    @ApiResponse({ status: 200, description: 'Return all photos.' })
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a photo by id' })
    @ApiResponse({ status: 200, description: 'Return the photo.' })
    async getPhoto(@Param('id') id: string): Promise<Photo> {
        return await this.photosService.getPhotoById(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a photo' })
    @ApiResponse({ status: 200, description: 'Photo has been updated successfully.' })
    async updatePhoto(
        @Param('id') id: string,
        @Body() updatePhotoDto: UpdatePhotoDto,
    ): Promise<Photo> {
        return await this.photosService.updatePhoto(id, updatePhotoDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a photo' })
    @ApiResponse({ status: 200, description: 'Photo has been deleted successfully.' })
    async deletePhoto(@Param('id') id: string): Promise<void> {
        return await this.photosService.deletePhoto(id);
    }
}
