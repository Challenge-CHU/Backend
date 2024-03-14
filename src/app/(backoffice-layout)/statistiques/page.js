import Stats from "@/components/Stats/Stats";
import prisma from "@/utils/db";

export const metadata = {
    title: "Challenges",
    description: "Liste et gestion des challenges",
};

async function getChallenges() {
    const challenges = await prisma.challenge.findMany({
        orderBy: [{ end_date: "asc" }],
    });
    return challenges;
}

export default async function Statistiques() {
    const challenges = await getChallenges();

    const challengesStats = [];

    for (const challenge of challenges) {
        const users = await prisma.user.findMany({
            include: {
                Steps: {
                    where: {
                        challenge_id: challenge.id,
                    },
                },
            },
        });

        let numberOfUsers = 0;
        let numberOfSteps = 0;

        for (const user of users) {
            if (user.Steps.length > 0) {
                numberOfUsers++;

                for (const step of user.Steps) {
                    numberOfSteps += step.step_count;
                }
            }
        }

        const stats = {
            challenge,
            numberOfUsers,
            totalSteps: numberOfSteps,
        };

        challengesStats.push(stats);
    }

    const users = await prisma.user.findMany({});

    return (
        <>
            <div className="page-header flex flex-col md:flex-row md:justify-between gap-2 items-center mb-10 ">
                <h1 className="text-3xl font-bold">Statistiques</h1>
            </div>

            <Stats
                challengesStats={challengesStats}
                numberOfUsers={users.length}
            />
        </>
    );
}
