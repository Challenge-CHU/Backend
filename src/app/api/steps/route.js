import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET() {
    try {
        const steps = await prisma.step.findMany();
        return NextResponse.json({ data: steps }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req) {
    const { user_id, step_count, challenge_id } = await req.json();
    const date = dayjs().toISOString();

    try {
        const step = await prisma.step.create({
            data: {
                user_id: user_id,
                date: date,
                step_count: step_count,
                challenge_id: challenge_id,
            },
        });

        return NextResponse.json({ data: step }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
