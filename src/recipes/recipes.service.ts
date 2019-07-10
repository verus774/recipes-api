import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRecipeDto, Recipe } from './recipes.model';
import { Ingredient } from '../ingredients/ingredient.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
    @InjectModel('Ingredient') private readonly ingredientModel: Model<Ingredient>,
  ) {}

  add(item: CreateRecipeDto): Promise<Recipe> {
    const newItem = new this.recipeModel(item);
    return newItem.save();
  }

  async get(id: string): Promise<Recipe | never> {
    let item: Recipe;

    try {
      item = await this.recipeModel.findById(id)
        .populate({path: 'ingredients', model: this.ingredientModel})
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find recipe.');
    }
    if (!item) {
      throw new NotFoundException('Could not find recipe.');
    }

    return item;
  }

  getAll(): Promise<Recipe[]> {
    return this.recipeModel.find()
      .populate({path: 'ingredients', model: this.ingredientModel})
      .exec();
  }

  async remove(id: string): Promise<never | null> {
    const result = await this.recipeModel.deleteOne({_id: id}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find ingredient');
    }
    return null;
  }

}
