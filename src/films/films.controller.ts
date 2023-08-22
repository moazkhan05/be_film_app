import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Public } from 'src/decorators/public.decorator';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCurrentUser } from 'src/decorators/getuser.decorator';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  create(@Body() film: CreateFilmDto) {
    return this.filmsService.create(film);
  }

  @Public()
  @Get()
  findAll() {
    return this.filmsService.findAll();
  }
  
  @Public()
  @Get('search')
  search(@Query('query') query: string) {
    return this.filmsService.search(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() film: UpdateFilmDto) {
    return this.filmsService.update(+id, film);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }

  @Post(':id/rating')
  createRate(@GetCurrentUser() user:any, @Param('id') id : string, @Body() rating: CreateRatingDto) {
    return this.filmsService.createRate(+id , rating, user);
  }

  
  @Patch(':id/rating/:rID')
  updateRate(@GetCurrentUser() user:any, @Param('id') id : string, @Param('rID') rID : string, @Body() rating: UpdateRatingDto) {
    return this.filmsService.updateRate(+id , rating , user , +rID);
  }

  @Delete(':id/rating/:rID')
  deleteRate(@Param('id') id : string, @Param('rID') rID : string) {
    return this.filmsService.deleteRate(+id , +rID);
  }

  @Post(':id/comment')
  createComment(@GetCurrentUser() user:any, @Param('id') id : string, @Body() comment: CreateCommentDto) {
    return this.filmsService.createComment(+id , comment, user);
  }

  @Patch(':id/comment/:cID')
  updateComment(@GetCurrentUser() user:any, @Param('id') id : string, @Param('cID') cID : string, @Body() comment: UpdateCommentDto) {
    return this.filmsService.updateComment(+id , comment, user , +cID);
  }

  @Delete(':id/comment/:cID')
  deleteComment(@Param('id') id : string, @Param('cID') cID : string) {
    return this.filmsService.deleteComment(+id , +cID);
  }

}
