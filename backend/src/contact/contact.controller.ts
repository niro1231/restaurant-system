import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private service: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() body: { message: string },
  ) {
    const email = req.user.email;

    return this.service.create({
      message: body.message,
      email,
    });
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}