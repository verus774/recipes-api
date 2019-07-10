import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Recipe } from './recipes.model';
import { Ingredient } from '../ingredients/ingredient.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
    @InjectModel('Ingredient') private readonly ingredientModel: Model<Ingredient>,
  ) {}

  add(item: any): Promise<Recipe> {
    const newItem = new this.recipeModel(item);
    return newItem.save();
  }

  getAll(): Promise<Recipe[]> {
    return this.recipeModel.find()
      .populate({path: 'ingredients', model: this.ingredientModel})
      .exec();
  }

}
