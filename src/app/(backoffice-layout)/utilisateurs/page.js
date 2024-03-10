import ModalUser from "@/components/Users/ModalNewUser";
import Challenge from "@/components/Challenge/Challenge";
import UserTable from "@/components/Users/UserTable";

export const metadata = {
    title: "Challenges",
    description: "Liste et gestion des challenges",
};

function getUsers() {
    let users = [];
    for (let i = 1; i <= 15; i++) {
        users.push({
            id: i,
            identifier: `user-${i}`,
            pseudo: `User ${i}`,
            firebase_device_token: "token",
            avatar_id: Math.floor(Math.random() * 10) + 1,
        });
    }

    return users;
}

export default function Utilisateurs() {
    const users = getUsers();

    return (
        <>
            <div className="page-header flex flex-col md:flex-row md:justify-between gap-2 items-center mb-10 ">
                <h1 className="text-3xl font-bold">Utilisateurs</h1>
                <ModalUser />
            </div>

            <UserTable users={users} />
        </>
    );
}
