import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { RecipesService } from './recipes.service';
import { CreateRecipeDto, Recipe, UpdateRecipeDto } from './recipes.model';

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() item: UpdateRecipeDto): Promise<Recipe | null> {
    return this.recipesService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<never | null> {
    return this.recipesService.remove(id);
  }
}
