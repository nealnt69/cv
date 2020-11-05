const jwt = require("jsonwebtoken");
const axios = require("axios");

const authenticate = async (req, res, next) => {
  const accessToken = req.cookies.knv_accessToken;
  if (!accessToken) {
    res.clearCookie("knv_accessToken", { path: "/" });
    res.redirect("/");
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      next();
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        res.clearCookie("knv_accessToken", { path: "/" });
        res.redirect("/");
      } else if (err.name === "TokenExpiredError") {
        const user = await axios({
          url: `${process.env.URL_MAIN_API_KNV}/auth/refresh-token`,
          method: "POST",
          data: {
            accessToken,
          },
        });
        if (user.data) {
          res.cookie("knv_accessToken", user.data.accessToken, {
            domain: process.env.DOMAIN_CLIENT_COOKIE,
            httpOnly: false,
          });
          res.locals.refreshToken = user.data.accessToken;
          next();
        }
      } else {
        res.clearCookie("knv_accessToken", { path: "/" });
        res.redirect("/");
      }
    }
  }
};

module.exports = authenticate;
