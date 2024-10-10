import { connect } from "@/dbConfig/dbConfig";
import User from '@/Models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest , NextResponse } from "next/server";
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email , password} = reqBody
        console.log(reqBody);
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({ error: "User Doesn't exist" }, { status: 400});
        }
        console.log("User exits");
        
        const validPassword = await bcryptjs.compare(password , user.password)

        if(!validPassword){
            return NextResponse.json({ error: "Incorrect email/password" }, { status: 400});
        }

        const tokenData = {
            id: user._id,
            username:user.username,
            email:user.email
        }

    const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn: '1d'})

    const response = NextResponse.json({
        message : "Logged in Success",
        success : true
    })

    response.cookies.set("token", token,{
        httpOnly:true
    })
    return response



    }catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: 500});
    }
}
