import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CreateCategoryDto, UpdateCategoryDto } from './category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  add(item: CreateCategoryDto): Promise<Category> {
    const newItem = new this.categoryModel(item);
    return newItem.save();
  }

  async get(id: string): Promise<Category | never> {
    let item: Category;

    try {
      item = await this.categoryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find category.');
    }
    if (!item) {
      throw new NotFoundException('Could not find category.');
    }

    return item;
  }

  getAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async update(id: string, updateIngredientDto: UpdateCategoryDto): Promise<Category | null> {
    return this.categoryModel.findByIdAndUpdate(id, updateIngredientDto, { new: true }).exec();
  }

  async remove(id: string): Promise<null> {
    const result = await this.categoryModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find category');
    }
    return null;
  }
}
