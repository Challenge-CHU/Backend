import prisma from "@/utils/db";
import Utilisateur from "@/components/Users/Utilisateur";

export const metadata = {};

async function getChallengesDatas(userId) {
    const challenges = await prisma.challenge.findMany();

    for (const challenge of challenges) {
        const userSteps = await prisma.step.findMany({
            where: {
                challenge_id: challenge.id,
                user_id: userId,
            },
        });
        challenge.userSteps = userSteps;
    }

    return challenges;
}

async function getUser(id) {
    const user = prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {},
    });

    return user;
}

export default async function UtilisateurPage({ params }) {
    const user = await getUser(params.id);
    const challenges = await getChallengesDatas(params.id);

    metadata.title = `${user.identifier} - ${user.pseudo}`;
    metadata.description = `Page de l'utilisateur ${user.identifier} - ${user.pseudo}`;
    user.challenges = challenges;

    return (
        <>
            <div className="page-header flex flex-col md:flex-row md:justify-between gap-2 items-center mb-10 ">
                <h1 className="text-3xl font-bold">
                    {user.identifier + " - " + user.pseudo}
                </h1>
            </div>

            <Utilisateur user={user} />
        </>
    );
}
