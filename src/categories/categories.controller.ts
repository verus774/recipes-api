import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ValidateObjectId } from '../shared/validate-object-id.pipe';
import { CategoriesService } from './categories.service';
import { Category, CreateCategoryDto, UpdateCategoryDto } from './category.model';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  add(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.add(category);
  }

  @Get(':id')
  get(@Param('id', new ValidateObjectId()) id: string): Promise<Category | never> {
    return this.categoriesService.get(id);
  }

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoriesService.getAll();
  }

  @Patch(':id')
  async update(@Param('id', new ValidateObjectId()) id: string, @Body() item: UpdateCategoryDto): Promise<Category | null> {
    return this.categoriesService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id', new ValidateObjectId()) id: string): Promise<null> {
    return this.categoriesService.remove(id);
  }
}
