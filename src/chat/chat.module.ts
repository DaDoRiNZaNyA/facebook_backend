import { Module, forwardRef } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './chat.controller';

@Module({
  imports: [forwardRef(() => AuthModule), JwtModule],
  providers: [ChatService, ChatGateway, PrismaService],
  exports: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
