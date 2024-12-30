import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtAccessToken } from './dto/jwt-access-token.iterface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(username);
        if(!user) return null;
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user: User): Promise<JwtAccessToken> {
        const payload = { username: user.username, sub: user.id };
        return { accessToken: this.jwtService.sign(payload)};
    }
}
