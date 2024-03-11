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

    return (
        <>
            <div className="page-header flex flex-col md:flex-row md:justify-between gap-2 items-center mb-10 ">
                <h1 className="text-3xl font-bold">Statistiques</h1>
            </div>

            <Stats challenges={challenges} />
        </>
    );
}
