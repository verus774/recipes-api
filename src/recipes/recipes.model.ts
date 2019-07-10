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
});

export interface Recipe extends Document {
  id: string;
  title: string;
  ingredients: Ingredient[];
}

export class CreateRecipeDto {
  readonly title: string;
  readonly ingredients: string[];
}

export type UpdateRecipeDto = Partial<CreateRecipeDto>;
