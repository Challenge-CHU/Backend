import prisma from "@/utils/db";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({data: users}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error}, { status: 500 });
    }
}

export async function POST(req) {
    const { identifier, pseudo } = await req.json();

    try {
        const user = await prisma.user.create({
            data: {
                identifier,
                pseudo,
            },
        });

        return NextResponse.json({data: user}, { status: 201 });
    } catch (error) {
        return NextResponse.json({error}, { status: 500 });
    }
}