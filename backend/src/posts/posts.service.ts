import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'title' | 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }) {
    const {
      search,
      category,
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (category) {
      where.category = category;
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const total = await this.prisma.post.count({ where });

    // Chỉ cho phép sortBy là các trường hợp hợp lệ
    const validSortFields = ['title', 'price', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortDir = sortOrder === 'asc' ? 'asc' : 'desc';

    const data = await this.prisma.post.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortField]: sortDir },
    });

    return { total, data };
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async getCategories() {
    const categories = await this.prisma.post.findMany({
      distinct: ['category'],
      select: { category: true },
    });
    return categories.map((c) => c.category);
  }
}
