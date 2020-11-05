const axios = require("axios");

const getUser = async (token) => {
  try {
    return axios({
      url: `${process.env.URL_MAIN_API_KNV}/auth/login`,
      method: "POST",
      headers: {
        Cookie: `knv_accessToken=${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser };
