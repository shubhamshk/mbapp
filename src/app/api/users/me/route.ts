import { connect } from "@/dbConfig/dbConfig";
import User from '@/Models/userModel';
import { NextRequest , NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request:NextRequest) {
    //extract data from token
    const userId = await getDataFromToken(request)
    User.findOne({_id: userId})
    const user = await User.findOne({_id:userId}).select("-password")
    return NextResponse.json({
        message:"User found",
        data:user
    })
}