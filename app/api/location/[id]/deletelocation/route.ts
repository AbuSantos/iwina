import { Location } from "@/(models)/Location";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const DELETE =async(req:NextRequest, {params})=>{
    try {
        await connectToDB()
        
    } catch (error) {
        
    }
}