import prisma from "@/utils/db";
import {NextResponse} from "next/server";

//Get all friends of a user
export async function GET(req, { params }) {
    const userId = params.id;

    if (!userId) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    try {
        const friends = await prisma.userFriend.findMany({
            where: {
                OR: [
                    { user_id: userId },
                    { friend_id: userId },
                ]
            },
        });

        return NextResponse.json({ data: friends }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

}

//Delete the link between two users
export async function DELETE(req, { params }) {
    const id = params.id;

    if (!id) {
        return NextResponse.json({ error: "Missing link ID" }, { status: 400 });
    }

    try {
        await prisma.userFriend.deleteMany({
            where: { id: id},
        });

        return NextResponse.json({ data: "Friend link Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}