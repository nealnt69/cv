const express = require("express");
const router = express.Router();
const themeService = require("../services/theme");
const authService = require("../services/auth");
const authenticate = require("../middlewares/auth");

router.get("/tao-mau", authenticate, async (req, res, next) => {
  const userLogin = await authService.getUser(
    res.locals.refreshToken || req.cookies.knv_accessToken
  );
  res.render("createTheme", {
    user: userLogin.data.user,
  });
});

router.get("/them-mau", authenticate, async (req, res, next) => {
  const userLogin = await authService.getUser(
    res.locals.refreshToken || req.cookies.knv_accessToken
  );

  res.render("addTheme", {
    user: userLogin.data.user,
  });
});

router.get("/quan-ly-mau", authenticate, async (req, res, next) => {
  const themes = await themeService.getThemes(1, 10);
  const userLogin = await authService.getUser(
    res.locals.refreshToken || req.cookies.knv_accessToken
  );

  res.render("themeManager", { themes, user: userLogin.data.user });
});

router.get("/sua-mau/:id", authenticate, async (req, res, next) => {
  const { id } = req.query;

  const theme = await themeService.getTheme(id);
  const userLogin = await authService.getUser(
    res.locals.refreshToken || req.cookies.knv_accessToken
  );

  res.render("editTheme", { theme, user: userLogin.data.user });
});

module.exports = router;
