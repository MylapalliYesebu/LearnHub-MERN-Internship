const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
});

const courseSchema = new mongoose.Schema(
  {
    C_educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    C_category: {
      type: String,
      required: true,
    },
    C_title: {
      type: String,
      required: true,
    },
    C_description: {
      type: String,
      required: true,
    },
    C_price: {
      type: Number,
      default: 0,
    },
    sections: [sectionSchema],
    enrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
