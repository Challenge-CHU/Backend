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
        console.log(friends)

        for (const friend of friends) {
            const user = await prisma.user.findUnique({
                where: {
                    id: friend.friend_id
                }
            })

            friend.pseudo = user.pseudo;
            friend.avatar_id = user.avatar_id;

            const stepsFriends= await prisma.step.findMany({
                where: {
                    user_id: friend.friend_id
                }
            })

            const stepToday = stepsFriends.filter(step => {
                const today = new Date();
                return step.date.toDateString() === today.toDateString();
            })

            friend.stepToday = stepToday[0].step_count;

            friend.stepsTotal = stepsFriends.reduce((acc, step) => acc + step.step_count, 0);
        }

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
