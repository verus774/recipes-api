import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRecipeDto, Recipe, UpdateRecipeDto } from './recipes.model';
import { Ingredient } from '../ingredients/ingredient.model';
import { Category } from '../categories/category.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
    @InjectModel('Ingredient') private readonly ingredientModel: Model<Ingredient>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async add(item: CreateRecipeDto): Promise<Recipe> {
    const newItem = new this.recipeModel(item);
    await newItem.save();

    return this.recipeModel.populate(newItem, [
      {path: 'ingredients', model: 'Ingredient'},
      {path: 'category', model: 'Category'},
    ]);
  }

  async get(id: string): Promise<Recipe | never> {
    let item: Recipe;

    try {
      item = await this.recipeModel.findById(id)
        .populate([
          {path: 'ingredients', model: this.ingredientModel},
          {path: 'category', model: this.categoryModel},
        ])
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
      .populate([
        {path: 'ingredients', model: this.ingredientModel},
        {path: 'category', model: this.categoryModel},
      ])
      .exec();
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe | null> {
    return this.recipeModel.findByIdAndUpdate(id, updateRecipeDto, { new: true })
      .populate([
        {path: 'ingredients', model: this.ingredientModel},
        {path: 'category', model: this.categoryModel},
      ])
      .exec();
  }

  async remove(id: string): Promise<never | null> {
    const result = await this.recipeModel.deleteOne({_id: id}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find recipe');
    }
    return null;
  }

}
