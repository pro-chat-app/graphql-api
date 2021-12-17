import { Module } from '@nestjs/common';
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
    JwtModule.register({
      signOptions: {
        expiresIn: '24h',
      },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy],
})
export class AuthModule {}
