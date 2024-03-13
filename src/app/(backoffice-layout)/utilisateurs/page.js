import ModalUser from "@/components/Users/ModalNewUser";
import Challenge from "@/components/Challenge/Challenge";
import UserTable from "@/components/Users/UserTable";
import prisma from "@/utils/db";
import ModalImportUser from "@/components/Users/ModalImportUser";

export const metadata = {
    title: "Utilisateurs",
    description: "Liste et gestion des utilisateurs",
};

async function getUsers() {
    const users = await prisma.user.findMany();
    return users;
}

export default async function Utilisateurs() {
    const users = await getUsers();

    return (
        <>
            <div className="page-header flex flex-col md:flex-row md:justify-between gap-2 items-center mb-10 ">
                <h1 className="text-3xl font-bold">Utilisateurs</h1>
                <div className="flex gap-2">
                    <ModalImportUser />
                    <ModalUser />
                </div>
            </div>

            <UserTable users={users} />
        </>
    );
}
