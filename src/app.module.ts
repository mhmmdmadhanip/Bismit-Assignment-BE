import { Module } from '@nestjs/common';
import { BookModule } from './user/user.module';


@Module({
  imports: [BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
