import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module'; // ✅ ADD THIS
import { ContactModule } from './contact/contact.module';


@Module({
  imports: [MenuModule, AuthModule, UsersModule,PrismaModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
  
  
})
export class AppModule {}
