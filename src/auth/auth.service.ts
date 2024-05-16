import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly adminService: AdminService,
        private jwtService: JwtService
    ) {

    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async signIn(signInDto:SignInDto): Promise<any> {
        if(!signInDto){
            throw new UnauthorizedException();
        }
        const admin = await this.adminService.findAdmin(signInDto.username);
        if (!admin) {
            throw new UnauthorizedException();
        }
        if (!await this.comparePassword(signInDto.password, admin.password)) {
            throw new UnauthorizedException();
        }

        const payload = { username: admin.username, sub: admin.id };
        const token = await this.jwtService.signAsync(payload);
        return {
            username: admin.username,
            access_token: token
        };
    }

    async signUp(signUpDto:SignUpDto): Promise<any> {
        if(!signUpDto){
            throw new UnauthorizedException();
        }
        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
        signUpDto.password = hashedPassword;
        const newAdmin = await this.adminService.create(signUpDto);
        const payload = { username: newAdmin.username, sub: newAdmin.id };
        const token = await this.jwtService.signAsync(payload);
        return {
            admin: signUpDto.username,
            access_token: token
        };
    }
}
