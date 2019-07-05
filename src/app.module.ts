import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { IngredientsModule } from './ingredients/ingredients.module';

const configService = new ConfigService(`.env`);
const dbUri = configService.get('DB_URI');

@Module({
  imports: [
    IngredientsModule,
    MongooseModule.forRoot(dbUri, { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
