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
    const { friend_pseudo } = await req.json();

    try {
        const friend = await prisma.user.findUnique({
            where: {
                pseudo: friend_pseudo
            }
        })

        const friendExists = await prisma.userFriend.findFirst({
            where: {
                friend_id: friend.id,
                user_id: userId
            }
        })

        if (friendExists) {
            return NextResponse.json({ error: "Friend link already exists" }, { status: 400 });
        } else {

                const userFriend = await prisma.userFriend.create({
                    data: {
                        user_id: userId,
                        friend_id: friend.id,
                    },
                });

                return NextResponse.json({ data: userFriend }, { status: 201 });

        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
