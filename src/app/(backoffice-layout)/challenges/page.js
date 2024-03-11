import ModalChallenge from "@/components/Challenge/ModalChallenge";
import Challenge from "@/components/Challenge/Challenge";
import prisma from "@/utils/db";

export const metadata = {
    title: "Challenges",
    description: "Liste et gestion des challenges",
};

async function getChallenges() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
}

export default async function Challenges() {
    const challenges = await getChallenges();
    console.log("CHALLENGES");
    console.log(challenges);

    return (
        <>
            <div className="page-header flex flex-col md:flex-row md:justify-between gap-2 items-center mb-10 ">
                <h1 className="text-3xl font-bold">Challenges</h1>
                <ModalChallenge />
            </div>

            <Challenge challenges={challenges} />
        </>
    );
}
