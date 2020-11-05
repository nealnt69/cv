const express = require("express");
const router = express.Router();
const cvService = require("../services/cv");
const authenticate = require("../middlewares/auth");
const authService = require("../services/auth");

router.post("/", authenticate, async (req, res, next) => {
  const { title, html, htmlFull, height, data } = req.body;
  const userLogin = await authService.getUser(
    res.locals.refreshToken || req.cookies.knv_accessToken
  );
  await cvService.saveCv(
    title,
    html,
    htmlFull,
    height,
    data,
    userLogin.data.user
  );
  res.end();
});

router.put("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const { title, html, htmlFull, height, data } = req.body;
  const userLogin = await authService.getUser(
    res.locals.refreshToken || req.cookies.knv_accessToken
  );
  await cvService.updateCv(
    id,
    title,
    html,
    htmlFull,
    height,
    data,
    userLogin.data.user
  );
  res.end();
});

router.post("/preview", async function (req, res, next) {
  const { title, html, height } = req.body;
  const pdfBase64 = await cvService.previewCV(title, html, height);
  res.json({ pdf: pdfBase64 });
});

router.get("/", authenticate, async (req, res) => {
  const { page, size } = req.query;
  const userLogin = await authService.getUser(
    res.locals.refreshToken || req.cookies.knv_accessToken
  );
  const listCv = await cvService.getCvs(userLogin.data.user, page, size);
  res.json({ status: 200, listCv });
});

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  await cvService.deleteCv(id);
  res.json({ status: 200 });
});

module.exports = router;
