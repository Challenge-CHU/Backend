"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    Image,
    Tooltip,
} from "@nextui-org/react";
import { Button } from "react-daisyui";
import { FaEye, FaPen, FaMagnifyingGlass } from "react-icons/fa6";
import ModalDelete from "./ModalDelete";
import ModalEditUser from "./ModalEditUser";
import Link from "next/link";
import { useState } from "react";

const UserTable = ({ users }) => {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
    const [search, setSearch] = useState("");

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        if (search !== "") {
            const searchQuery = search
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            return users
                .filter(
                    (user) =>
                        getKeyValue(user, "identifier")
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(searchQuery) ||
                        getKeyValue(user, "pseudo")
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(searchQuery)
                )
                .slice(start, end);
        }

        return users.slice(start, end);
    }, [page, users, search]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "identifier":
                return (
                    <Link
                        href={`/utilisateurs/${user.id}`}
                        className="text-secondary font-bold cursor-pointer active:opacity-50"
                    >
                        {cellValue}
                    </Link>
                );
            case "pseudo":
                return (
                    <Link
                        href={`/utilisateurs/${user.id}`}
                        className="text-secondary font-bold cursor-pointer active:opacity-50"
                    >
                        {cellValue}
                    </Link>
                );
            case "avatar_id":
                return (
                    <div className="flex items-center gap-2">
                        <Image
                            src={"./avatars/" + cellValue + ".png"}
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Link
                            href={`/utilisateurs/${user.id}`}
                            className=" btn btn-secondary btn-xs text-white cursor-pointer active:opacity-50"
                        >
                            <FaEye /> Voir
                        </Link>
                        <ModalEditUser user={user} />
                        <ModalDelete id={user.id} />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="flex lg:justify-end mb-3 items-center gap-3 ">
                <FaMagnifyingGlass
                    Search
                    className="text-secondary"
                    size={24}
                />
                <input
                    aria-label="Rechercher"
                    type="text"
                    placeholder="Rechercher ..."
                    className="input input-primary input-md  md:w-1/4"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Table
                isStriped
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn key="avatar_id">Avatar</TableColumn>
                    <TableColumn key="identifier">Identifiant</TableColumn>
                    <TableColumn key="pseudo">Pseudo</TableColumn>
                    <TableColumn key="actions">Actions</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"Aucun utilisateur à afficher"}
                    items={items}
                >
                    {(item) => (
                        <TableRow key={item.name}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default UserTable;
