import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeSchema } from './recipes.model';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { IngredientSchema } from '../ingredients/ingredient.model';
import { CategorySchema } from '../categories/category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Recipe', schema: RecipeSchema },
      { name: 'Ingredient', schema: IngredientSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {
}
