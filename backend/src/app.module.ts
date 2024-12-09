import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller'; 
import { UsersService } from './services/user.service';
import { DatabaseService } from './services/db.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController], 
  providers: [UsersService, DatabaseService],
})
export class AppModule {}
