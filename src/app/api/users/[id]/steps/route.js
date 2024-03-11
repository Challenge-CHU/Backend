import prisma from "@/utils/db";
import {NextResponse} from "next/server";
import dayjs from "dayjs";

export async function GET(req, { params }) {
    const userId = params.id;

    if (!userId) {
        return { status: 400, body: { error: "Missing user ID" } };
    }

    try {
        const steps = await prisma.step.findMany({
            where: { user_id: userId },
        });

        return NextResponse.json({ data: steps }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const userId = params.id;

    if (!userId) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }


    const { date, steps, challenge_id } = await req.json();
    console.log(date);
    console.log(dayjs(date).toISOString());

    if(!date) {
        return NextResponse.json({ error: "Missing date" }, { status: 400 });
    }

    if(!steps) {
        return NextResponse.json({ error: "Missing steps" }, { status: 400 });
    }

    if(!challenge_id) {
        return NextResponse.json({ error: "Missing challenge_id" }, { status: 400 });
    }

    const stepData = {
        user_id: userId,
        date: dayjs(date).toISOString(),
        step_count: steps,
        challenge_id: challenge_id,
    };

    const existingStep = await prisma.step.findFirst({
        where: {
            user_id: userId,
            date: stepData.date,
            challenge_id: challenge_id,
        },
    });

    if(existingStep && steps > existingStep.step_count) {
        try {
            const step = await prisma.step.update({
                where: { id: existingStep.id },
                data: {
                    step_count: steps,
                },
            });

            return NextResponse.json({ data: step }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
    } else {
        try {
            const step = await prisma.step.create({
                data: stepData,
            });

            return NextResponse.json({ data: step }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
    }
}
