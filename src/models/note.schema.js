import mongoose, { Schema } from 'mongoose';

export const NOTE_STATUS = {
  ACTIVE: 'active',
  DELETED: 'deleted',
};
export const NOTE_THEME = {
  DARK: 'dark',
  LIGHT: 'light',
  DEFAULT: 'default',
};

export const noteSchema = new Schema({
  title: { type: String, required: true },
  note: { type: String, required: true },
  createdBy: { type: String, required: true },
  url: { type: String, required: true },
  tags: { type: [String] },
  theme: { type: String, default: NOTE_THEME.DEFAULT },
  status: { type: String, default: NOTE_STATUS.ACTIVE },
  files: { type: [String] },
});

export const Note = mongoose.model('Note', noteSchema);
