import prisma from "@/utils/db";
import {NextResponse} from "next/server";

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