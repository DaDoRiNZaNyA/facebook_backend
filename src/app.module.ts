import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin-panel/admin.module';
import { PostsModule } from './posts/posts.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [UsersModule, AuthModule, AdminModule, PostsModule, FollowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
