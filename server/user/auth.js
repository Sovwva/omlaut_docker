import dotenv from "dotenv";
import jwt, {decode} from "jsonwebtoken";

dotenv.config();

class TokenService {
    static async genereteAccessToken(payload){
        return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "7d",
        })
    }

    static async generateRefreshToken(payload) {
        return await jwt.sign(payload, process.env.RESRESH_TOKEN_SECRET, {
            expiresIn: "30d",
        })
    }

    static async verifyToken(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({message: "Token not provided"});
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({message: "Failed to authentication"})
            }
            req.user = decoded;
            next()
        })
    }
}

export default TokenService;