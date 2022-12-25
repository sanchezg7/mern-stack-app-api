import env from "../env.js";

const forgotPasswordEmailParams = (email, token) => {
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
    <h1>Reset your password</h1>
    <p>Please use the following link to reset your password:</p>
    <p>${env.CLIENT_URL}/auth/password/reset${token}</p>
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
    forgotPasswordEmailParams
}