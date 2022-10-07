const DB_USER = process.env.DB_HOST || "postgres";

const DB_PASSWORD = process.env.DB_PASSWORD || "rivercampeon2014";

const DB_HOST = process.env.DB_HOST || "localhost";

const DB_APIKEY = process.env.DB_APIKEY || "live_USOTF7kZiXouRdxgeouVcacNh9jzeIN2BQD5Mcu8LGdSYXORzyru99HZamAqwfwx";

const DB_PORT = process.env.DB_PORT || 3001;

const DB_DATABASE = process.env.DB_DATABASE;

const REACT_API_URL = process.env.REACT_API_URL || "http://localhost:3001";

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_APIKEY,
    DB_PORT,
    DB_DATABASE,
    REACT_API_URL
}






