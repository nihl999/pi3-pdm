import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './modules/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './ormconfig';

@Module({
  imports: [CoreModule, TypeOrmModule.forRoot(DatabaseConfiguration)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
