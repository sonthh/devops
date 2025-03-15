import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [ConfigModule],
          name: 'USER_PACKAGE',
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              package: 'user',
              protoPath: [join(__dirname, 'user.proto')],
              url: configService.get('USER_API_GRPC_URL'),
              loader: {
                defaults: true,
              },
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
