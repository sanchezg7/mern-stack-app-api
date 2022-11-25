import env from "../env.js";

const registerEmailParams = (email, token) => {
    const to = env.EMAIL_HARDCODE;
    return {
        Source: env.EMAIL_FROM,
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
<html>
    <h1>Verify your email address</h1>
    <p>Please use the following linnk to complete your registration</p>
    <p>${env.CLIENT_URL}/auth/activate/${token}</p>
</html>`
                }
            },
            Subject: {
                "Charset": "UTF-8",
                "Data": "Complete your registration"
            }
        },
        ReplyToAddresses: [env.EMAIL_FROM]
    };
};

export {
    registerEmailParams
}