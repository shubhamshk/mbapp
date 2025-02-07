import { connect } from "@/dbConfig/dbConfig";
import User from '@/Models/userModel';
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username , email , password} = reqBody
        console.log(reqBody);
        const user = await User.findOne({email})

        if (user){
            return NextResponse.json({error : "user already Exist"}, {status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password , salt)

        const newUser = new User({
            username, 
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        //send verification email

        await sendEmail({email , emailType:"VERIFY" , userId:savedUser._id } )

        return NextResponse.json({
            message :"User registered Successfully",
            success: true,
            savedUser
        })
        
        
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: 500});
    }
    
}