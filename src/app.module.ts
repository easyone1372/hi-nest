import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

//데코레이터
//nestJs는 데코레이터와 함께함: 데코레이터가 클래스에 함수 기능을 추가할 수 있기 때문
//appModule은 모든 것의 root module이다
//한가지 기능을 하는 앱

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
