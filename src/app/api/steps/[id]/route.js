import prisma from "@/utils/db";
import {NextResponse} from "next/server";

export async function GET(req, { params }) {
    const stepId = params.id;

    if (!stepId) {
        return NextResponse.json({error: "Missing step ID"}, {status: 400});
    }

    try {
        const step = await prisma.step.findUnique({
            where: {id: stepId},
        });

        if (!step) {
            return NextResponse.json({error: "Step not found"}, {status: 404});
        }

        return NextResponse.json({data: step}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

export async function PUT(req, { params }) {
    const stepId = params.id;

    if (!stepId) {
        return NextResponse.json({error: "Missing step ID"}, {status: 400});
    }

    const { step_count } = await req.json();

    try {
        const step = await prisma.step.update({
            where: {id: stepId},
            data: {
                step_count,
            },
        });

        return NextResponse.json({data: step}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

export async function DELETE(req, { params }) {
    const stepId = params.id;

    if (!stepId) {
        return NextResponse.json({error: "Missing step ID"}, {status: 400});
    }

    try {
        await prisma.step.delete({
            where: {id: stepId},
        });

        return NextResponse.json({data: "Step deleted"}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}