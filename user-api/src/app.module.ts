import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { User } from './user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('USER_POSTGRES_HOST'),
        port: +configService.get('USER_POSTGRES_PORT'),
        username: configService.get('USER_POSTGRES_USERNAME'),
        password: configService.get('USER_POSTGRES_PASSWORD'),
        database: configService.get('USER_POSTGRES_DATABASE'),
        entities: [join(__dirname, '*.entity.js')],
        synchronize: false,
        migrationsRun: true,
        migrations: [join(__dirname, 'migrations', '*.js')],
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
