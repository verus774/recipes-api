import { Document, Schema } from 'mongoose';

export const IngredientSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export interface Ingredient extends Document {
  id: string;
  title: string;
}

export class CreateIngredientDto {
  readonly title: string;
}

export type UpdateIngredientDto = Partial<CreateIngredientDto>;
