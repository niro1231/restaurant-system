import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.menuItem.findMany();
  }

  findOne(id: number) {
    return this.prisma.menuItem.findUnique({
      where: { id },
    });
  }

  create(data: any) {
    return this.prisma.menuItem.create({
      data,
    });
  }

  update(id: number, data: any) {
    return this.prisma.menuItem.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.menuItem.delete({
      where: { id },
    });
  }
}