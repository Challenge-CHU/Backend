import { NextResponse } from "next/server";
import prisma from "../../../utils/db";

export async function GET(req, res) {
    const allUsers = await prisma.user.findMany();
    
    return NextResponse.json(allUsers);
}