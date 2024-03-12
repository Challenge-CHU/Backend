import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const challengeId = params.id;
    console.log(challengeId);

    const startDate = req.nextUrl.searchParams.get("start_date");
    const endDate = req.nextUrl.searchParams.get("end_date");

    if (!startDate || !endDate) {
        return NextResponse.json(
            { error: "Missing start date or end date" },
            { status: 400 }
        );
    }

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    if (!challengeId) {
        return NextResponse.json(
            { error: "Missing challenge ID" },
            { status: 400 }
        );
    }
    try {
        const challenge = await prisma.challenge.findUnique({
            where: { id: challengeId },
        });

        if (!challenge) {
            return NextResponse.json(
                { error: "Challenge not found" },
                { status: 404 }
            );
        }

        try {
            const users = await prisma.user.findMany({
                include: {
                    Steps: {
                        where: {
                            challenge_id: challengeId,
                        },
                        orderBy: {
                            date: "asc",
                        },
                    },
                },
            });

            // of two dates
            let Difference_In_Time = date2.getTime() - date1.getTime();

            // Calculating the no. of days between
            // two dates
            let Difference_In_Days = Math.round(
                Difference_In_Time / (1000 * 3600 * 24)
            );

            // To display the final no. of days (result)
            console.log(
                "Total number of days between dates:\n" +
                    date1.toDateString() +
                    " and " +
                    date2.toDateString() +
                    " is: " +
                    Difference_In_Days +
                    " days"
            );

            challenge.users = users;

            let challengeDatas = [];

            challengeDatas = users.map((user) => {
                const challengeData = {
                    userIdentifier: user.identifier,
                };

                user.Steps.forEach((step) => {
                    challengeData[step.date.toISOString().split("T")[0]] =
                        step.step_count;
                });
                challengeData.total = user.Steps.reduce(
                    (acc, step) => acc + step.step_count,
                    0
                );
                console.log(challengeData.total / (Difference_In_Days + 1));
                challengeData.average = Math.floor(
                    challengeData.total / (Difference_In_Days + 1)
                );

                return challengeData;
            });

            return NextResponse.json({ data: challengeDatas }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
