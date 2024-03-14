import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const challengeId = params.id;

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

            const date1 = new Date(challenge.start_date);
            let date2 = new Date(challenge.end_date);
            if (date2 > new Date()) {
                date2 = new Date();
                date2.setHours(23, 59, 59);
            }
            let Difference_In_Time = date2.getTime() - date1.getTime();
            let Difference_In_Days = Math.round(
                Difference_In_Time / (1000 * 3600 * 24)
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
                challengeData.average = Math.floor(
                    challengeData.total / Difference_In_Days
                );

                return challengeData;
            });

            let totalSteps = challengeDatas.reduce(
                (acc, user) => acc + user.total,
                0
            );

            let numberOfUsers = 0;
            users.map((user) => {
                if (user.Steps.length > 0) {
                    numberOfUsers++;
                }
            });

            let averageStepsPerUser = Math.floor(totalSteps / numberOfUsers);
            let averageStepsPerDayAndPerUser = Math.floor(
                averageStepsPerUser / Difference_In_Days
            );

            let challengeStats = {
                challengeId: challenge.id,
                challengeName: challenge.name,
                numberOfUsers,
                totalSteps,
                averageStepsPerUser,
                averageStepsPerDayAndPerUser,
            };

            let challengeIsRunning = false;
            let today = new Date();
            if (today >= date1 && today <= date2) {
                challengeIsRunning = true;
            }
            if (challengeIsRunning) {
                challengeStats.challengeIsRunning = true;

                let todaySteps = 0;
                users.map((user) => {
                    user.Steps.map((step) => {
                        if (
                            step.date.toISOString().split("T")[0] ===
                            today.toISOString().split("T")[0]
                        ) {
                            todaySteps += step.step_count;
                        }
                    });
                });
                let last7daysSteps = 0;
                let last7days = new Date(today);
                last7days.setDate(last7days.getDate() - 7);
                users.map((user) => {
                    user.Steps.map((step) => {
                        if (step.date >= last7days) {
                            last7daysSteps += step.step_count;
                        }
                    });
                });
                challengeStats.todaySteps = todaySteps;
                challengeStats.last7daysSteps = last7daysSteps;
            }

            let challengesWeeks = [];
            let week = 1;
            let weekSteps = 0;
            let weekStartDate = new Date(challenge.start_date);
            let weekEndDate = new Date(challenge.start_date);
            weekEndDate.setDate(weekEndDate.getDate() + 6);
            let weekData = {
                week,
                weekStartDate: weekStartDate.toISOString().split("T")[0],
                weekEndDate: weekEndDate.toISOString().split("T")[0],

                weekSteps:
                    weekSteps > 0 ? weekSteps : today > weekEndDate ? 0 : null,
            };
            challengesWeeks.push(weekData);
            let i = 0;
            while (weekEndDate < date2) {
                week++;
                weekStartDate = new Date(weekEndDate);
                weekStartDate.setDate(weekStartDate.getDate() + 1);
                weekEndDate = new Date(weekStartDate);
                weekEndDate.setDate(weekEndDate.getDate() + 6);
                weekSteps = 0;
                weekData = {
                    week,
                    weekStartDate: weekStartDate.toISOString().split("T")[0],
                    weekEndDate: weekEndDate.toISOString().split("T")[0],

                    weekSteps:
                        weekSteps > 0
                            ? weekSteps
                            : today > weekEndDate
                            ? 0
                            : null,
                };
                challengesWeeks.push(weekData);
                i++;
            }
            challengesWeeks.map((week) => {
                users.map((user) => {
                    user.Steps.map((step) => {
                        const weekStartDate = new Date(week.weekStartDate);
                        const weekEndDate = new Date(week.weekEndDate);
                        weekEndDate.setHours(23, 59, 59, 999); // Set end date to last second of the day
                        if (
                            step.date >= weekStartDate &&
                            step.date <= weekEndDate
                        ) {
                            week.weekSteps += step.step_count;
                        }
                    });
                });
            });
            challengeStats.challengesWeeks = challengesWeeks;

            const averageStepLengthInMeters = 0.60; // in meters

            function convertStepsToEarthCircumnavigations(steps) {
                const earthCircumferenceInMeters = 40075000; // in meters

                const totalDistanceInMeters = steps * averageStepLengthInMeters;
                return (totalDistanceInMeters / earthCircumferenceInMeters).toFixed(3);
            }

            challengeStats.totalDistanceInEarthCircumnavigations = convertStepsToEarthCircumnavigations(
                totalSteps
            );

            function convertStepsToCO2Saved(steps) {
                const co2SavedPerMeter = 0.00027; // in kg

                const totalDistanceInMeters = steps * averageStepLengthInMeters;
                return (totalDistanceInMeters * co2SavedPerMeter).toFixed(1);
            }

            challengeStats.totalCO2SavedInKg = convertStepsToCO2Saved(totalSteps);

            function convertStepsToKilometers(steps) {
                const totalDistanceInMeters = steps * averageStepLengthInMeters;
                return (totalDistanceInMeters / 1000).toFixed(0);
            }

            challengeStats.totalDistanceInKilometers = convertStepsToKilometers(totalSteps);

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
