import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: '24h',
        },
        secret: configService.get('jwt.token'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy],
})
export class AuthModule {}
