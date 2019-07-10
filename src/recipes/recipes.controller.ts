import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { RecipesService } from './recipes.service';
import { CreateRecipeDto, Recipe } from './recipes.model';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  add(@Body() recipe: CreateRecipeDto): Promise<Recipe> {
    return this.recipesService.add(recipe);
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Recipe | never> {
    return this.recipesService.get(id);
  }

  @Get()
  getAll(): Promise<Recipe[]> {
    return this.recipesService.getAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<never | null> {
    return this.recipesService.remove(id);
  }
}
