import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ingredient } from './ingredient.model';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel('Ingredient') private readonly ingredientModel: Model<Ingredient>,
  ) {}

  add(title: string): Promise<Ingredient> {
    const newItem = new this.ingredientModel({
      title,
    });
    return newItem.save();
  }

  getAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }

  async remove(id: string): Promise<null> {
    const result = await this.ingredientModel.deleteOne({_id: id}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find ingredient');
    }
    return null;
  }
}
