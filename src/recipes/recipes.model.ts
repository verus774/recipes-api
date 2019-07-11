import { Document, Schema } from 'mongoose';

import { Ingredient } from '../ingredients/ingredient.model';

export const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
  ingredients: Ingredient[];
  cookedAt?: Date;
}

export class CreateRecipeDto {
  readonly title: string;
  readonly ingredients: string[];
  readonly cookedAt?: string | number;
}

export type UpdateRecipeDto = Partial<CreateRecipeDto>;
