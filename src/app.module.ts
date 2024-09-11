import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin-panel/admin.module';
import { PostsModule } from './posts/posts.module';
import { FollowModule } from './follow/follow.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      exclude: ['/uploads/*'],
    }),
    UsersModule,
    AuthModule,
    AdminModule,
    PostsModule,
    FollowModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
