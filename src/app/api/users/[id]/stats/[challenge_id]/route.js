import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const userId = params.id;
    const challengeId = params.challenge_id;

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

        try {
            const date1 = new Date(challenge.start_date);
            const date2 = new Date(challenge.end_date);
            let Difference_In_Time = date2.getTime() - date1.getTime();
            let Difference_In_Days = Math.round(
                Difference_In_Time / (1000 * 3600 * 24)
            );

            let totalSteps = user.Steps.reduce(
                (acc, step) => acc + step.step_count,
                0
            );

            let averageSteps = Math.floor(
                totalSteps / (Difference_In_Days + 1)
            );

            let challengeStats = {
                userId: user.id,
                userIdentifier: user.identifier,
                challengeId: challenge.id,
                challengeName: challenge.name,
                totalSteps,
                averageSteps,
            };

            let challengeIsRunning = false;
            let today = new Date();
            if (today >= date1 && today <= date2) {
                challengeIsRunning = true;
            }
            if (challengeIsRunning) {
                challengeStats.challengeIsRunning = true;

                let todaySteps = 0;
                user.Steps.map((step) => {
                    if (
                        step.date.toISOString().split("T")[0] ===
                        today.toISOString().split("T")[0]
                    ) {
                        todaySteps += step.step_count;
                    }
                });
                let last7daysSteps = 0;
                let last7days = new Date(today);
                last7days.setDate(last7days.getDate() - 7);
                user.Steps.map((step) => {
                    if (step.date >= last7days) {
                        last7daysSteps += step.step_count;
                    }
                });
                challengeStats.todaySteps = todaySteps;
                challengeStats.last7daysSteps = last7daysSteps;
            }

            let challengesWeeks = [];
            let week = 1;
            let weekStartDate = new Date(date1);
            let weekEndDate = new Date(date1);
            while (weekEndDate <= date2) {
                weekEndDate.setDate(weekEndDate.getDate() + 7);
                let weekSteps = 0;
                user.Steps.map((step) => {
                    if (
                        step.date >= weekStartDate &&
                        step.date <= weekEndDate
                    ) {
                        weekSteps += step.step_count;
                    }
                });
                challengesWeeks.push({
                    week,
                    startDate: weekStartDate.toISOString().split("T")[0],
                    endDate: weekEndDate.toISOString().split("T")[0],
                    weekSteps:
                        weekSteps > 0
                            ? weekSteps
                            : today > weekEndDate
                            ? 0
                            : null,
                });
                week++;
                weekStartDate.setDate(weekStartDate.getDate() + 7);
            }
            challengeStats.challengesWeeks = challengesWeeks;

            return NextResponse.json({ data: challengeStats }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
