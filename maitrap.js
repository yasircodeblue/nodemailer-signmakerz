const { MailtrapClient } = require("mailtrap");

const TOKEN = "9df1593bd8e39fed7fe895c8eacb5fec";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
    email: "mailtrap@api.codeblue.agency",
    name: "Mailtrap Test",
};
const recipients = [
    {
        email: "yasir.codeblue@gmail.com",
    }
];

client
    .send({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        text: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
    })
    .then(console.log, console.error);