import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeSchema } from './recipes.model';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { IngredientSchema } from '../ingredients/ingredient.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Recipe', schema: RecipeSchema },
      { name: 'Ingredient', schema: IngredientSchema },
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {
}
