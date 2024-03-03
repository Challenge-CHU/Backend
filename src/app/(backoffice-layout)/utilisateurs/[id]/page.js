import ModalChallenge from "@/components/Challenge/ModalChallenge";
import Challenge from "@/components/Challenge/Challenge";
import Utilisateur from "@/components/Users/Utilisateur";

export const metadata = {
    title: "Challenges",
    description: "Liste et gestion des challenges",
};

function getUser() {
    return {
        id: 1,
        identifier: "identifiant123",
        pseudo: "pseudo123",
        firebase_device_token: "token123",
        avatar_id: 1,
        challenges: [
            {
                id: 1,
                name: "Challenge 1",
                startDate: "2023-02-01",
                endDate: "2023-05-05",
                userSteps: [
                    {
                        id: 1,
                        step_count: 1000,
                        date: "2024-02-01",
                        user_id: 1,
                        challenge_id: 1,
                    },
                    {
                        id: 2,
                        step_count: 2000,
                        date: "2024-02-02",
                        user_id: 1,
                        challenge_id: 1,
                    },
                    {
                        id: 3,
                        step_count: 3000,
                        date: "2024-02-03",
                        user_id: 1,
                        challenge_id: 1,
                    },
                ],
            },
            {
                id: 2,
                name: "Challenge 2",
                startDate: "2024-02-01",
                endDate: "2024-05-05",
                userSteps: [
                    {
                        id: 1,
                        step_count: 1000,
                        date: "2024-02-01",
                        user_id: 1,
                        challenge_id: 1,
                    },
                    {
                        id: 2,
                        step_count: 2000,
                        date: "2024-02-02",
                        user_id: 1,
                        challenge_id: 1,
                    },
                    {
                        id: 3,
                        step_count: 3000,
                        date: "2024-02-03",
                        user_id: 1,
                        challenge_id: 1,
                    },
                ],
            },
            {
                id: 3,
                name: "Challenge 3",
                startDate: "2025-02-01",
                endDate: "2025-05-05",

                userSteps: [
                    {
                        id: 1,
                        step_count: 1000,
                        date: "2024-02-01",
                        user_id: 1,
                        challenge_id: 1,
                    },
                    {
                        id: 2,
                        step_count: 2000,
                        date: "2024-02-02",
                        user_id: 1,
                        challenge_id: 1,
                    },
                    {
                        id: 3,
                        step_count: 3000,
                        date: "2024-02-03",
                        user_id: 1,
                        challenge_id: 1,
                    },
                ],
            },
        ],
    };
}

export default function Challenges() {
    const user = getUser();

    return (
        <>
            <div className="page-header flex justify-between items-center mb-10 ">
                <h1 className="text-3xl font-bold">
                    {user.identifier + " - " + user.pseudo}
                </h1>
            </div>

            <Utilisateur user={user} />
        </>
    );
}
