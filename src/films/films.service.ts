import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()


export class FilmsService {
  constructor( private prisma : PrismaService){}

  async create(film: CreateFilmDto) {
    return await this.prisma.film.create({
      data: {...film},
    }); 

  }

  async findAll() {
    return await this.prisma.film.findMany({ include : {ratings:true , comments:true}});
  }

  async findOne(id: number) {
    return await this.prisma.film.findUnique({
      where: { id }, include : {ratings:true , comments:true}
    });
  }

  async search(query: string) {
    return await this.prisma.film.findMany({
      where: {
        name: {
          contains: query, 
          mode: 'insensitive',
        }
      }, include : {ratings:true , comments:true}
    });
  }

  async update(id: number, film: UpdateFilmDto) {
    return await this.prisma.film.update({
      where: { id },
      data: film,
    });
  }

  async remove(id: number) {
    return await this.prisma.film.delete({
      where: { id },
    });
  }

  async createRate(id:number , rating : CreateRatingDto ,  user:any) {
    return await this.prisma.film.update({
      where : { id },
      data : {
        ratings : {
          create : { ...rating , userId : user.id}
        }
      }, include : {ratings:true , comments:true}
    })
  }

  async updateRate(id:number , rating : UpdateRatingDto, user : any , rID:number) {
    return await this.prisma.film.update({
      where : { id },
      data : {
        ratings : {
          update : { where : {id : rID},
          data : {...rating , userId : user.id} }
        }
      }, include : {ratings:true , comments:true}
    })
  }

  async deleteRate(id:number , rID:number) {
    return await this.prisma.film.update({
      where : { id },
      data : {
        ratings : {
          delete : { id : rID}
        }
      }
    })
  }

  async createComment(id:number , comment : CreateCommentDto, user : any) {
    return await this.prisma.film.update({
      where : { id },
      data : {
        comments : {
          create : { ...comment , userId : user.id }
        }
      }, include : {ratings:true , comments:true}
    })
  }

  async updateComment(id:number , comment : UpdateCommentDto , user : any , cID:number) {
    return await this.prisma.film.update({
      where : { id },
      data : {
        comments : {
          update : { where : {id : cID},
          data : {...comment, userId : user.id} }
        }
      }, include : {ratings:true , comments:true}
    })
  }

  async deleteComment(id:number , rID:number) {
    return await this.prisma.film.update({
      where : { id },
      data : {
        comments : {
          delete : { id : rID}
        }
      }
    })
  }
}
