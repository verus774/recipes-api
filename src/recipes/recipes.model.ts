import { Document, Schema } from 'mongoose';

import { Ingredient } from '../ingredients/ingredient.model';
import { Category } from '../categories/category.model';

export const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  ingredients: {
    type: [Schema.Types.ObjectId],
    ref: 'Ingredient',
    required: true,
  },
  cookedAt: {
    type: Date,
  },
});

export interface Recipe extends Document {
  id: string;
  title: string;
  category: Category;
  ingredients: Ingredient[];
  cookedAt?: Date;
}

export class CreateRecipeDto {
  readonly title: string;
  readonly category?: string;
  readonly ingredients: string[];
  readonly cookedAt?: string | number;
}

export type UpdateRecipeDto = Partial<CreateRecipeDto>;
