import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
