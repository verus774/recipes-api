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
