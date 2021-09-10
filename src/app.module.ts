import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
