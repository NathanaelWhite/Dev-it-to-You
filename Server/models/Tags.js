const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const tagsSchema = new Schema({
  tags: {
    type: String,
    enum: ['HTML', 'Javascript', 'CSS'],
  },
});

const Tags = model('Tags', tagsSchema);

module.exports = Tags;
