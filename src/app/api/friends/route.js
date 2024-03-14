import prisma from "@/utils/db";
import {NextResponse} from "next/server";

//Get all friends
export async function GET() {
    try {
        const friends = await prisma.userFriend.findMany();
       return NextResponse.json({ data: friends }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

//Create a new friend link
export async function POST(req) {
    const { user_id, friend_id } = await req.json();

    try {
        const friend = await prisma.userFriend.create({
            data: {
                user_id: user_id,
                friend_id: friend_id,
            },
        });

        return NextResponse.json({ data: friend }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function DELETE(req) {
const { user_id, friend_id } = await req.json();

    try {
        await prisma.userFriend.deleteMany({
            where: {
                OR: [
                    { user_id: user_id, friend_id: friend_id },
                    { user_id: friend_id, friend_id: user_id },
                ]
            },
        });

        return NextResponse.json({ data: "Friend link Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}