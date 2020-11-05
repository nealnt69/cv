const express = require("express");
const router = express.Router();
const themeService = require("../services/theme");

router.post("/", async (req, res, next) => {
  const { title, html, image } = req.body;
  const theme = await themeService.saveTheme(title, html, image);
  res.json({ status: 200, theme });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const theme = await themeService.getTheme(id);
  res.json({ status: 200, theme });
});

router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const themes = await themeService.getThemes(page, size);
  res.json({ status: 200, themes });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, html, image } = req.body;
  const theme = await themeService.updateTheme(id, title, html, image);
  res.json({ status: 200, theme });
});

module.exports = router;
