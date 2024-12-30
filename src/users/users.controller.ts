import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.insertUser(createUserDto);
    }
    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.findUsers();
    }
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return await this.usersService.findUserById(id);
    }
}
