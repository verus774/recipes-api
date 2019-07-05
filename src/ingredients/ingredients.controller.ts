import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredient.model';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  add(
    @Body('title') title: string,
  ): Promise<Ingredient> {
    return this.ingredientsService.add(
      title,
    );
  }

  @Get()
  getAll(): Promise<Ingredient[]> {
    return this.ingredientsService.getAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<null> {
    return this.ingredientsService.remove(id);
  }
}
