const nodemailer = require("nodemailer");
const config = require("../config/Auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "adrar.nabila01@gmail.com",
    pass: pass,
  },
