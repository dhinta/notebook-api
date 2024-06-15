import { Note } from '../models/note.schema.js';
import { generateShortAlphaNumericId } from '../utils/common.js';
import { NOTE_STATUS } from '../models/note.schema.js';

// List
export const list = async () => {
  try {
    const note = await Note.find({});
    return note;
  } catch (err) {
    console.error(err);
    return {
      error: 'Error fetching notes',
    };
  }
};

// Create
export const create = async ({ title, note, tags }) => {
  try {
    const url = generateShortAlphaNumericId();
    const data = await Note.create({ title, note, tags, url });
    return {
      id: data._id,
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Error creating note',
    };
  }
};

// Update
export const update = async ({ id, ...data }) => {
  try {
    const response = await Note.findByIdAndUpdate({ _id: id }, data);
    return {
      ...response.toJSON(),
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Error updating note',
    };
  }
};

// Delete
export const deleteNote = async ({ id }) => {
  try {
    const data = await Note.updateOne(
      { _id: id },
      { $set: { status: NOTE_STATUS.DELETED } },
    );

    const response = {
      success: !!data.modifiedCount,
      message: data.modifiedCount
        ? 'Note deleted successfully'
        : 'Error processing data, please try again',
    };

    return response;
  } catch (err) {
    console.error(err);
    return {
      error: 'Error deleting note',
    };
  }
};

export const restoreNote = async ({ id }) => {
  try {
    const data = await Note.updateOne(
      { _id: id },
      { $set: { status: NOTE_STATUS.ACTIVE } },
    );

    const response = {
      success: !!data.modifiedCount,
      message: data.modifiedCount
        ? 'Note restored successfully'
        : 'Error processing data, please try again',
    };

    return response;
  } catch (err) {
    console.error(err);
    return {
      error: 'Error deleting note',
    };
  }
};

export const distinctTags = async () => {
  try {
    const tags = await Note.distinct('tags');
    return tags;
  } catch (err) {
    console.error(err);
    return {
      error: 'Error fetching tags',
    };
  }
};
