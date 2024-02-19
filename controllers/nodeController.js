const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    logger: true,
    debug: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
    },
});

const postMessage = async (req, res) => {
    try {
        let mailOptions = {
            from: process.env.MAIL,
            to: req.body.email,
            subject: `${req.body.name} sends a message `,
            html: `<table role="presentation" style="width: 600px; border-collapse: collapse;">
                    <tbody>
                    <tr>
                        <th style="padding: 16px 12px; text-align: left;">Name</th>
                        <td style="padding: 16px 12px;">${req.body.name}</td>
                    </tr>
                    <tr>
                        <th style="padding: 16px 12px; text-align: left;">E-mail</th>
                        <td style="padding: 16px 12px;">${req.body.email}</td>
                    </tr>
                    <tr style="background: #edf2f4;">
                        <th style="padding: 16px 12px; text-align: left;">Message</th>
                        <td style="padding: 16px 12px;">${req.body.message}</td>
                    </tr>
                    </tbody>
                </table>`,
        };

        // Verify the transporter before sending the email
        await transporter.verify();
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);

        return res.send({
            type: "success",
            message: "Message Sent Successfully",
        });
    } catch (err) {
        console.error('Error:', err);

        return res.status(500).send({
            type: "error",
            message: "Internal Server Error",
            error: err,
        });
    }
};


module.exports = { postMessage }

