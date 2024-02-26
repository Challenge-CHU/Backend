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
import { FaEye, FaPen } from "react-icons/fa6";
import ModalDelete from "./ModalDelete";
import ModalEditUser from "./ModalEditUser";

const UserTable = ({ users }) => {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
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
                        <Button className="btn-secondary btn-xs text-white cursor-pointer active:opacity-50">
                            <FaEye /> Voir
                        </Button>
                        <ModalEditUser user={user} />
                        <ModalDelete id={user.id} />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table
            isStriped
            removeWrapper
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
                <TableColumn key="identifier">Identifier</TableColumn>
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
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default UserTable;
