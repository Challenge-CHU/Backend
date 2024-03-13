import prisma from "@/utils/db";
import {NextResponse} from "next/server";

export async function GET(req, { params }) {
    const userId = params.id;

    if (!userId) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    try {
        const friends = await prisma.userFriend.findMany({
            where: { user_id: userId }

        });

        return NextResponse.json({ data: friends }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    const userId = params.id;
    const { friend_id } = await req.json();

    try {
        const friendExists = await prisma.userFriend.findFirst({
            where: {
                friend_id: friend_id,
                user_id: userId
            }
        })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    if (friendExists) {
        return NextResponse.json({ error: "Friend link already exists" }, { status: 400 });
    } else {
        try {
            const friend = await prisma.userFriend.create({
                data: {
                    user_id: userId,
                    friend_id: friend_id,
                },
            });

            return NextResponse.json({ data: friend }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
    }
}
