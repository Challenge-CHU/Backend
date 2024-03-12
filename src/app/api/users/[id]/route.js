import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const userId = params.id;

    if (!userId) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const userId = params.id;

    if (!userId) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const { identifier, pseudo } = await req.json();

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                identifier,
                pseudo,
            },
        });

        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 404 });
    }
}

export async function DELETE(req, { params }) {
    const userId = params.id;

    if (!userId) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    try {
        await prisma.step.deleteMany({
            where: { user_id: userId },
        });

        await prisma.userBadge.deleteMany({
            where: { user_id: userId },
        });

        await prisma.userFriend.deleteMany({
            where: {
                OR: [{ user_id: userId }, { friend_id: userId }],
            },
        });

        await prisma.userFriendRequest.deleteMany({
            where: {
                OR: [{ user_id: userId }, { friend_id: userId }],
            },
        });


        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ data: "User deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
