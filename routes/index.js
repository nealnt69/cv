const express = require("express");
const router = express.Router();
const path = require("path");
const themeService = require("../services/theme");
const cvService = require("../services/cv");
const authenticate = require("../middlewares/auth");
const authService = require("../services/auth");

router.get(
  "/",
  (req, res, next) => {
    if (req.cookies.knv_accessToken) {
      next();
    } else {
      res.render("landing", { user: null });
    }
  },
  authenticate,
  async (req, res, next) => {
    const userLogin = await authService.getUser(
      res.locals.refreshToken || req.cookies.knv_accessToken
    );
    res.render("landing", { user: userLogin.data.user });
  }
);

router.get(
  "/mau-cv",
  async (req, res, next) => {
    const { page, size } = req.query;
    if (req.cookies.knv_accessToken) {
      next();
    } else {
      const themes = await themeService.getThemes(page || 1, size || 10);
      res.render("listCv", { themes, user: null });
    }
  },
  authenticate,
  async (req, res) => {
    const { page, size } = req.query;
    const themes = await themeService.getThemes(page || 1, size || 10);
    const userLogin = await authService.getUser(
      res.locals.refreshToken || req.cookies.knv_accessToken
    );
    res.render("listCv", { themes, user: userLogin.data.user });
  }
);

router.get(
  "/viet-cv/:id",
  async (req, res, next) => {
    if (req.cookies.knv_accessToken) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  authenticate,
  async (req, res, next) => {
    const { id } = req.params;
    const theme = await themeService.getTheme(id);
    const userLogin = await authService.getUser(
      res.locals.refreshToken || req.cookies.knv_accessToken
    );

    res.render("cv", {
      theme: theme.html,
      title: null,
      user: userLogin.data.user,
    });
  }
);

router.get("/sua-cv/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const cv = await cvService.getCv(id);
  const userLogin = await authService.getUser(
    res.locals.refreshToken || req.cookies.knv_accessToken
  );
  
  res.render("cv", {
    theme: cv.html,
    title: cv.title,
    user: userLogin.data.user,
  });
});

router.get("/xem-truoc/:id", async (req, res) => {
  const { id } = req.params;

  const cv = await cvService.getCv(id);
  res.render("previewCV", { pdf: cv.pdf });
});

router.get(
  "/login",
  (req, res, next) => {
    if (req.cookies.knv_accessToken) {
      next();
    } else {
      res.render("login", { user: null });
    }
  },
  authenticate,
  async (req, res, next) => {
    const userLogin = await authService.getUser(
      res.locals.refreshToken || req.cookies.knv_accessToken
    );
    res.render("login", { user: userLogin.data.user });
  }
);

module.exports = router;
