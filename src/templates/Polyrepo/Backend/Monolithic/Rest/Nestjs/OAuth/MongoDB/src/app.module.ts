import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/models/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
    }
    ),
    TypeOrmModule.forRoot(
      {
        type: "mongodb",
        url:process.env.DATABASE_URL,
        database: process.env.DATABASE_NAME,
        entities: [User],
        synchronize: true
                          
      }
    ),
    
    PassportModule.register({ session: true }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
