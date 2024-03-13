import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function GET(req, { params }) {
    const challengeId = params.id;

    if (!challengeId) {
        return NextResponse.json(
            { error: "Missing challenge ID" },
            { status: 400 }
        );
    }
    try {
        const challenge = await prisma.challenge.findUnique({
            where: { id: challengeId },
        });

        if (!challenge) {
            return NextResponse.json(
                { error: "Challenge not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: challenge }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const challengeId = params.id;

    if (!challengeId) {
        return NextResponse.json(
            { error: "Missing challenge ID" },
            { status: 400 }
        );
    }

    const { name, description, start_date, end_date, password } =
        await req.json();
    try {
        let data = {
            name,
            description,
            start_date: new Date(start_date).toISOString(),
            end_date: new Date(end_date).toISOString(),
        };
        if (password) {
            const hashedPassword = await hash(password, 10);
            data.password = hashedPassword;
        }
        const challenge = await prisma.challenge.update({
            where: { id: challengeId },
            data: data,
        });

        return NextResponse.json({ data: challenge }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const challengeId = params.id;

    if (!challengeId) {
        return NextResponse.json(
            { error: "Missing challenge ID" },
            { status: 400 }
        );
    }

    try {
        await prisma.challenge.delete({
            where: { id: challengeId },
        });

        return NextResponse.json(
            { data: "Challenge deleted" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
