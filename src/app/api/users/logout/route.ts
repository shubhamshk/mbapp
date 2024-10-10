import { connect } from "@/dbConfig/dbConfig";
import {NextResponse } from "next/server";

connect()

export async function GET() {
    try {
        const Response = NextResponse.json({
            message:"logout Successfully",
            success:true
        })

        Response.cookies.set("token", "",{
            httpOnly:true,
            expires:new Date(0)
        }) 

        return Response
        
    }catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: 500});
    }
}