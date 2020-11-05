const themeModel = require("../db/models/theme");

const saveTheme = async (title, html, image) => {
  const newTheme = new themeModel({
    title,
    html,
    image,
  });
  return newTheme.save();
};

const getTheme = async (id) => {
  return themeModel.findById(id);
};

const getThemes = async (page, size) => {
  return themeModel
    .find()
    .skip((page * 1 - 1) * size)
    .limit(size * 1);
};

const updateTheme = async (id, title, html, image) => {
  return themeModel.findByIdAndUpdate(id, { title, html, image });
};

module.exports = {
  saveTheme,
  getTheme,
  getThemes,
  updateTheme,
};
