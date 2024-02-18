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
} from "@nextui-org/react";

const UserTable = ({ users }) => {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    return (
        <Table
            classNames={{
                wrapper: "min-h-[222px]",
            }}
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
        >
            <TableHeader>
                <TableColumn key="avatar">Avatar</TableColumn>
                <TableColumn key="identifier">Identifier</TableColumn>
                <TableColumn key="pseudo">Pseudo</TableColumn>
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.name}>
                        {(columnKey) => (
                            <TableCell>
                                {getKeyValue(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default UserTable;
