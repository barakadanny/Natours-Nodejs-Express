const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to - user.email;
        this.firstname = user.name.split(' ')[0];
        this.url = url;
        this.from = `Tours Support <${process.env.EMAIL_FROM}>`;
    }

    createTransport() {
        if(process.env.NODE_ENV === 'production') {
            return 1;  
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    // Send the actual email
    send(template, subject) {
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
            firstname: this.firstname,
            url: this.url,
            subject
        })
        
        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        // 3) Create transport and send the email
    };

    sendWelcome() {
        this.send('Welcome', 'Welcome to Jaloo family!')
    }
}

const sendEmail = async options => {

    // 2) Define the email options
    

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
}

