import prisma from "@/utils/db";
import {NextResponse} from "next/server";

export async function GET(req, { params }) {
    const friendRequestId = params.id;

    if (!friendRequestId) {
        return NextResponse.json({error: "Missing friend request ID"}, {status: 400});
    }

    try {
        const friendRequest = await prisma.userFriendRequest.findUnique({
            where: {id: friendRequestId},
        });

        if (!friendRequest) {
            return NextResponse.json({error: "Friend request not found"}, {status: 404});
        }

        return NextResponse.json({data: friendRequest}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

export async function DELETE(req, { params }) {
    const friendRequestId = params.id;

    if (!friendRequestId) {
        return NextResponse.json({error: "Missing friend request ID"}, {status: 400});
    }

    try {
        await prisma.userFriendRequest.delete({
            where: {id: friendRequestId},
        });

        return NextResponse.json({ data: "Friend request link Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}