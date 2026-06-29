import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.user.findMany();
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  // BLOCK USER
  block(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        blocked: true,
      },
    });
  }

  // UNBLOCK USER
  unblock(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        blocked: false,
      },
    });
  }
  
}


