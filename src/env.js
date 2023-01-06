import dotenv from "dotenv";

const env = dotenv.config();

const PORT= process.env.PORT || 8080;

export default { ...env.parsed, PORT };
