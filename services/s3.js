const AWS = require("aws-sdk");
const dataUriToBuffer = require("data-uri-to-buffer");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const uploadImageS3 = async (fileContent, fileName, typeUpload) => {
  const type = fileContent.split(";")[0].split("/")[1];
  const base64Data = Buffer.from(
    fileContent.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  return new Promise((resolve) => {
    const params = {
      Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
      Key: fileName,
      Body: base64Data,
      ContentType: `image/png`,
      ACL: process.env.S3_FILE_PERMISSION,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        throw err;
      }
      resolve(data.Location);
    });
  });
};

const uploadPdfS3 = (fileContent, fileName, typeUpload) => {
  const type = fileContent.split(";")[0].split("/")[1];
  const base64Data = Buffer.from(
    fileContent.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  return new Promise((resolve) => {
    const params = {
      Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
      Key: fileName,
      Body: base64Data,
      ContentType: `application/pdf`,
      ACL: process.env.S3_FILE_PERMISSION,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        throw err;
      }
      resolve(data.Location);
    });
  });
};

module.exports = {
  uploadImageS3,
  uploadPdfS3,
};
