import prisma from "@/utils/db";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const friendsRequests = await prisma.userFriendRequest.findMany();
        return NextResponse.json({data: friendsRequests}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error}, { status: 500 });
    }
}

export async function POST(req) {
    const { user_id, friend_id } = await req.json();

    try {
        const friendsRequest = await prisma.userFriendRequest.create({
            data: {
                user_id: user_id,
                friend_id: friend_id,
            },
        });

        return NextResponse.json({data: friendsRequest}, { status: 201 });
    } catch (error) {
        return NextResponse.json({error}, { status: 500 });
    }
}

export async function DELETE(req) {
const { user_id, friend_id } = await req.json();

    try {
        await prisma.userFriendRequest.deleteMany({
            where: {
                OR: [
                    { user_id: user_id, friend_id: friend_id },
                    { user_id: friend_id, friend_id: user_id },
                ]
            },
        });

        return NextResponse.json({ data: "Friend request Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}