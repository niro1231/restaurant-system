import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  create(data: { message: string; email: string }) {
    return this.prisma.contactMessage.create({
      data,
    });
  }

  findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  remove(id: number) {
    return this.prisma.contactMessage.delete({
      where: { id },
    });
  }
}