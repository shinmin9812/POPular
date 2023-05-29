import { Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';

//{useNewUrlParser: true, userUnifiedTopology: true} 해당 부분에 대해 deprecatedError가 발생
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure() {
    //몽구스 쿼리 로거(개발 시에만 사용, 빌드시에는 this.isDev => false 처리)
    mongoose.set('debug', this.isDev);
  }
}
