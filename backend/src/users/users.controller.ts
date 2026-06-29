import { Controller, Get, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch(':id/block')
  block(@Param('id') id: string) {
    return this.usersService.block(+id);
  }

  @Patch(':id/unblock')
  unblock(@Param('id') id: string) {
    return this.usersService.unblock(+id);
  }
}