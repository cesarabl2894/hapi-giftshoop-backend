const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

class Mail {
  constructor() {
    this.templateDirectory =
      path.dirname(require.main.filename) + "/templates/emails/";
  }
  async getEmailTransport() {
    const connection = await nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });

    return connection;
  }

  async getEmailTemplate(templateName) {
    const source = await fs.readFileSync(
      path.join(this.templateDirectory, templateName + ".hbs"),
      "utf8",
      (error, data) => {
        if (error) console.log(error);
        // console.log(error)

        return data;
      }
    );
    const template = await Handlebars.compile(source);
    return template;
  }

  async sendEmail(options) {
    const emailConnection = await this.getEmailTransport();
    const renderTemplate = await this.getEmailTemplate(options.template);
    return emailConnection.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: options.to,
      subject: options.subject || "",
      text: options.text,
      html: renderTemplate(options.data) || ""
    });
  }
}

module.exports = new Mail();
