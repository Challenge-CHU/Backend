import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const userId = params.id;
    const challengeId = params.challenge_id;

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

    // Rest of the code...

    if (!userId) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                Steps: {
                    where: {
                        challenge_id: challengeId,
                        date: {
                            gte: date1,
                            lte: date2,
                        },
                    },
                    orderBy: {
                        date: "asc",
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const challenge = await prisma.challenge.findUnique({
            where: { id: challengeId },
        });

        if (!challenge) {
            return NextResponse.json(
                { error: "Challenge not found" },
                { status: 404 }
            );
        }

        // of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();

        // Calculating the no. of days between
        // two dates
        let Difference_In_Days = Math.round(
            Difference_In_Time / (1000 * 3600 * 24)
        );

        const challengeData = {
            userIdentifier: user.identifier,
            total: 0,
            average: 0,
        };

        user.Steps.forEach((step) => {
            const stepDate = step.date.toISOString().split("T")[0];
            if (stepDate >= startDate && stepDate <= endDate) {
                challengeData[stepDate] = step.step_count;
                challengeData.total += step.step_count;
            }
        });
        challengeData.total = user.Steps.reduce(
            (acc, step) => acc + step.step_count,
            0
        );
        challengeData.average = Math.floor(
            challengeData.total / (Difference_In_Days + 1)
        );

        return NextResponse.json({ data: challengeData }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
