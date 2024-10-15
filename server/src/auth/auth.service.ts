import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Response } from 'express';
import {
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRATION_DAYS,
} from 'src/constants/auth.constants';
import {
  DOMAIN,
  EnumNodeEnv,
  JWT_EXP,
  NODE_ENV,
} from 'src/constants/env.constants';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from '../types/auth.types';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(authUserDto: AuthUserDto) {
    //separates password and updated_at from user
    const { password, updated_at, ...newUser } =
      await this.userService.create(authUserDto);

    const tokens = this.issueTokens({
      id: newUser.id,
      email: newUser.email,
    });

    return { newUser, ...tokens };
  }

  async signIn(authUserDto: AuthUserDto) {
    const user = await this.userService.getOne(authUserDto.email);
    if (!user || !(await verify(user.password, authUserDto.password)))
      throw new UnauthorizedException('invalid credentials');

    const tokens = this.issueTokens({ id: user.id, email: user.email });
    const { password, ...data } = user;

    return { data, ...tokens };
  }

  async refreshTokens(refreshToken: string) {
    const result: IJwtPayload = await this.jwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('invalid refresh token');

    const user = await this.userService.getOne(result.id);
    if (!user) throw new NotFoundException('user not found');

    const tokens = this.issueTokens({ id: user.id, email: user.email });

    return tokens;
  }

  private issueTokens(payload: IJwtPayload) {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign(payload, {
        expiresIn: this.configService.get(JWT_EXP),
      });
    const refreshToken =
      'Bearer ' +
      this.jwtService.sign(payload, {
        expiresIn: `${REFRESH_TOKEN_EXPIRATION_DAYS}d`,
      });

    return { accessToken, refreshToken };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    refreshToken = refreshToken.slice(7);

    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + REFRESH_TOKEN_EXPIRATION_DAYS);

    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true, //prevents client-side scripts from capturing data stored on these cookies
      domain: this.configService.get(DOMAIN),
      expires: expiresIn,
      secure: true, //sends cookie over HTTPS
      sameSite:
        this.configService.get(NODE_ENV) === EnumNodeEnv.PRODUCTION
          ? 'lax'
          : 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true, //prevents client-side scripts from capturing data stored on these cookies
      domain: this.configService.get(DOMAIN),
      expires: new Date(0),
      secure: true, //sends cookie over HTTPS
      sameSite:
        this.configService.get(NODE_ENV) === EnumNodeEnv.PRODUCTION
          ? 'lax'
          : 'none',
    });
  }
}
