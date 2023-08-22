import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateTokenDto } from './dto/generate-token.dto';

import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService, private config : ConfigService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: {email : email}})

    if (!user)
      throw new UnauthorizedException('Invalid Credentials')

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) 
      throw new UnauthorizedException ('Invalid Credentials')

    return user;
  }

  async registerUser(user: CreateAuthDto) {

      const hashedPwd = await bcrypt.hash(user.password, 10)
      const createdUser = await this.prisma.user.create({data : {
        ...user , password:hashedPwd
      }})
     
      const authToken = await this.generateToken(createdUser)
      delete createdUser.password

      return {...createdUser, authToken};
    
  }

  async loginUser( user : GenerateTokenDto){
    const findUser = await this.validateUser(user.email, user.password)

    const authToken = await this.generateToken(findUser)
    delete findUser.password

    return {...findUser,authToken}
  }

  async generateToken(user: any): Promise<string> {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}


