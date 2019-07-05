import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

export interface Ingredient extends mongoose.Document {
  id: string;
  title: string;
}
