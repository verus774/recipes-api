import { Document, Schema } from 'mongoose';

export const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export interface Category extends Document {
  id: string;
  title: string;
}

export class CreateCategoryDto {
  readonly title: string;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
