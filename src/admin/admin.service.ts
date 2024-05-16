import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class AdminService {
    
    constructor(
        // create a repository for the entity
        @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    ) { }


    // find admin
    async findAdmin(username: string): Promise<any> {
        return await this.adminRepository.findOne({ where: { username:username } });
    }

    // create admin
    async create(signUpDto:SignUpDto): Promise<Admin> {
        // check if the admin exists
        const exits = await this.findAdmin(signUpDto.username);
        if (exits) {
            throw new UnauthorizedException();
        }
        // create a new admin
        const admin = new Admin();
        admin.username = signUpDto.username;
        admin.password = signUpDto.password;
        return await this.adminRepository.save(admin);
    }
}
