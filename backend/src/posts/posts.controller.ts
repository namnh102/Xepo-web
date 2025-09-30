import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('page')  page?: number,
    @Query('limit') limit?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    // Ép kiểu sortBy và sortOrder về đúng giá trị hợp lệ
    const validSortBy = ['title', 'price', 'createdAt'];
    const validSortOrder = ['asc', 'desc'];
    return this.postsService.findAll({
      search,
      category,
      page: Number(page),
      limit: Number(limit),
      minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
      maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
      sortBy: validSortBy.includes(sortBy as string) ? (sortBy as 'title' | 'price' | 'createdAt') : undefined,
      sortOrder: validSortOrder.includes(sortOrder as string) ? (sortOrder as 'asc' | 'desc') : undefined,
    });
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('categories/list')
  async getCategories() {
    return this.postsService.getCategories();
  }
}
