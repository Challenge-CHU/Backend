import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function GET() {
    try {
        const challenges = await prisma.challenge.findMany({
            orderBy: {
                end_date: "asc",
            },
        });
        return NextResponse.json({ data: challenges }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req) {
    const { name, description, start_date, end_date, password } =
        await req.json();

    console.log(name, description, start_date, end_date, password);
    try {
        const challenge = await prisma.challenge.create({
            data: {
                name,
                description,
                password: await hash(password, 10),
                start_date: new Date(start_date).toISOString(),
                end_date: new Date(end_date).toISOString(),
            },
        });

        return NextResponse.json({ data: challenge }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
