const puppeteer = require("puppeteer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const s3Service = require("./s3");
const cvModel = require("../db/models/cv");

const saveCv = async (title, html, htmlFull, height, data, user) => {
  const {
    avatar,
    name,
    job_position,
    birthday,
    gender,
    phone,
    email,
    address,
    objective,
    education,
    experience,
    activity,
    more_infomation,
    skill,
    favorite,
    reference,
    project,
    prize,
    certificate,
  } = data;
  const document = `
  <!DOCTYPE html>
  <html>
      <style>
      @page { 
        size: A4 portrait; 
        margin:0px -8px 0px -8px;
      }
      #cv-container{
        height:${Math.ceil(height / 1122.2) * 1122.2}px;
        margin-top:-8px;
        box-sizing: border-box;
      }
      </style>
      ${html}
  </html>
`;

  return puppeteer
    .launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    })
    .then(async (browser) => {
      let page = await browser.newPage();
      await page.setContent(document, {
        waitUntil: ["networkidle0", "networkidle2"],
      });

      const bufferPdf = await page.pdf({
        displayHeaderFooter: true,
        printBackground: true,
        preferCSSPageSize: true,
        deviceScaleFactor: 1,
      });

      const pdfDoc = await PDFDocument.load(bufferPdf);

      pdfDoc.setTitle(`Xem CV Online ${title}`);

      const pdfDocBase64 = await pdfDoc.saveAsBase64();

      page.setViewport({
        width: 794,
        height: 1122,
        deviceScaleFactor: 1,
      });

      const base64Image = await page.screenshot({
        clip: {
          x: 8,
          y: 0,
          width: 794,
          height: 1122,
        },
        encoding: "base64",
      });

      const imageUrl = await s3Service.uploadImageS3(
        base64Image,
        Date.now().toString() + ".png",
        "image/png"
      );

      const pdfUrl = await s3Service.uploadPdfS3(
        pdfDocBase64,
        Date.now().toString() + ".pdf",
        "cv_create"
      );

      await new cvModel({
        user_created: user._id,
        title,
        html: htmlFull,
        image: imageUrl,
        pdf: pdfUrl,
        avatar,
        name,
        job_position,
        birthday,
        gender,
        phone,
        email,
        address,
        objective,
        education,
        experience,
        activity,
        more_infomation,
        skill,
        favorite,
        reference,
        project,
        prize,
        certificate,
      }).save();

      await browser.close();
    });
};

const updateCv = async (id, title, html, htmlFull, height, data, user) => {
  const {
    avatar,
    name,
    job_position,
    birthday,
    gender,
    phone,
    email,
    address,
    objective,
    education,
    experience,
    activity,
    more_infomation,
    skill,
    favorite,
    reference,
    project,
    prize,
    certificate,
  } = data;
  const document = `
  <!DOCTYPE html>
  <html>
      <style>
      @page { 
        size: A4 portrait; 
        margin:0px -8px 0px -8px;
      }
      #cv-container{
        height:${Math.ceil(height / 1122.2) * 1122.2}px;
        margin-top:-8px;
        box-sizing: border-box;
      }
      </style>
      ${html}
  </html>
`;

  return puppeteer
    .launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    })
    .then(async (browser) => {
      let page = await browser.newPage();
      await page.setContent(document, {
        waitUntil: ["networkidle0", "networkidle2"],
      });

      const bufferPdf = await page.pdf({
        displayHeaderFooter: true,
        printBackground: true,
        preferCSSPageSize: true,
        deviceScaleFactor: 1,
      });

      const pdfDoc = await PDFDocument.load(bufferPdf);

      pdfDoc.setTitle(`Xem CV Online ${title}`);

      const pdfDocBase64 = await pdfDoc.saveAsBase64();

      page.setViewport({
        width: 794,
        height: 1122,
        deviceScaleFactor: 1,
      });

      const base64Image = await page.screenshot({
        clip: {
          x: 8,
          y: 0,
          width: 794,
          height: 1122,
        },
        encoding: "base64",
      });

      const imageUrl = await s3Service.uploadImageS3(
        base64Image,
        Date.now().toString() + ".png",
        "image/png"
      );

      const pdfUrl = await s3Service.uploadPdfS3(
        pdfDocBase64,
        Date.now().toString() + ".pdf",
        "cv_create"
      );

      await cvModel.findByIdAndUpdate(id, {
        user_created: user._id,
        title,
        html: htmlFull,
        image: imageUrl,
        pdf: pdfUrl,
        avatar,
        name,
        job_position,
        birthday,
        gender,
        phone,
        email,
        address,
        objective,
        education,
        experience,
        activity,
        more_infomation,
        skill,
        favorite,
        reference,
        project,
        prize,
        certificate,
      });

      await browser.close();
    });
};

const previewCV = async (title, html, height) => {
  const document = `
  <!DOCTYPE html>
  <html>
      <style>
      @page { 
          size: A4 portrait; 
          margin:0px -8px 0px -8px;
      }
      #cv-container{
       height:${Math.ceil(height / 1122.2) * 1122.2}px;
        margin-top:-8px;
        box-sizing: border-box;
      }
      </style>
      ${html}
  </html>
`;

  return puppeteer
    .launch({
      ignoreDefaultArgs: ["--disable-extensions"],
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    })
    .then(async (browser) => {
      let page = await browser.newPage();
      await page.setContent(document, {
        waitUntil: ["networkidle0", "networkidle2"],
      });

      const bufferPdf = await page.pdf({
        displayHeaderFooter: true,
        printBackground: true,
        preferCSSPageSize: true,
        deviceScaleFactor: 1,
      });

      const pdfDoc = await PDFDocument.load(bufferPdf);

      pdfDoc.setTitle(`Xem CV Online ${title}`);
      // pdfDoc.setAuthor("Humpty Dumpty");
      // pdfDoc.setSubject("📘 An Epic Tale of Woe 📖");
      // pdfDoc.setKeywords(["eggs", "wall", "fall", "king", "horses", "men"]);
      // pdfDoc.setProducer("PDF App 9000 🤖");
      // pdfDoc.setCreator("pdf-lib (https://github.com/Hopding/pdf-lib)");

      const pdfDocSave = await pdfDoc.saveAsBase64();

      await browser.close();

      return pdfDocSave;
    });
};

const getCvs = async (user, page, size) => {
  return cvModel
    .find({ user_created: user._id, status: "active" })
    .skip((page * 1 - 1) * size)
    .limit(size * 1);
};

const getCv = async (id) => {
  return cvModel.findById(id);
};

const deleteCv = async (id) => {
  return cvModel.findByIdAndUpdate(id, { status: "delete" });
};

module.exports = {
  saveCv,
  updateCv,
  previewCV,
  getCvs,
  getCv,
  deleteCv,
};
