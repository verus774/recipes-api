import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.model';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  add(@Body() recipe: any): Promise<Recipe> {
    return this.recipesService.add(
      recipe,
    );
  }

  @Get()
  getAll(): Promise<Recipe[]> {
    return this.recipesService.getAll();
  }
}
