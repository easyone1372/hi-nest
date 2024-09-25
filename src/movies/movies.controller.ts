import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

//nestjs에서는 무언가 필요하면 우리가 요청해야한다
@Controller('movies') //entry Point 역할
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  //nestJS는 express위에서 작동하므로 req, res를 직접 사용할 수 있다
  //그러나 직접적으로 사용하는 것은 권장되지 않는다
  //nestjs는 2개의 프레임워크를 사용하고 fastify라는 것으로 전환시킬 수 있다.
  //이것은 express보다 2배 빠르다
  //그러므로 res, req를 많이 사용하지 않는 것이 중요하다

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  //url에 있는 id라는parameter를 get하고자함
  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  //모든 리소스를 업데이트함
  //   @Put()
  //리소스의 일부분만 업데이트함
  @Patch(':id')
  pathMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
