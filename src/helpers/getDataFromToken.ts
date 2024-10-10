import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";


interface CustomJwtPayload extends JwtPayload {
    id: string;
}

export const getDataFromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const DecodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as CustomJwtPayload

        return DecodedToken.id
        
    } catch (error) {
        throw new Error("Error decrypting jwt: " + error);
    }
}