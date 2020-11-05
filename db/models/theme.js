const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const themeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    html: {
      type: String,
      default: "",
    },
  },
  schemaOptions
);

themeSchema.index({});

const themeModel = mongoose.model("themes", themeSchema);
module.exports = themeModel;
