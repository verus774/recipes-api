import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto, Ingredient } from './ingredient.model';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  add(@Body() ingredient: CreateIngredientDto): Promise<Ingredient> {
    return this.ingredientsService.add(ingredient);
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Ingredient | never> {
    return this.ingredientsService.get(id);
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
