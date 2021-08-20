const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const tagsSchema = new Schema({
  tags: {
    type: String
  },
});

const Tags = model('Tags', tagsSchema);

module.exports = Tags;
