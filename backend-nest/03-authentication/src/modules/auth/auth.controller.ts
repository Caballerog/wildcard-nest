import { Controller, Post, HttpStatus, Res, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './interfaces/auth.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local')
  public async login(
    @Res() res,
    @Body(new ValidationPipe())
    auth: AuthDto,
  ): Promise<{ token }> {
    const token = await this.authService.sign(auth);
    return res.status(HttpStatus.ACCEPTED).json({ token });
  }
}
