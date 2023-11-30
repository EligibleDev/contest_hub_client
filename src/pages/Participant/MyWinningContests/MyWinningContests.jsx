import { useQuery } from "@tanstack/react-query";
import { getMyWinningContests } from "../../../api/contests";
import useMain from "../../../hooks/useMain/useMain";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { useState } from "react";

const MyWinningContests = () => {
    const { user } = useMain();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data: contests, isLoading } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => await getMyWinningContests(user?.email),
    });

    const columns = [
        { id: "name", label: "Name", minWidth: 200 },
        { id: "attemptedCount", label: "Attempted Count", minWidth: 150 },
        { id: "deadline", label: "Deadline", minWidth: 100 },
    ];

    const createData = (contest) => {
        return {
            id: contest._id,
            name: contest.name,
            attemptedCount: contest.attemptedCount,
            deadline: contest.deadline,
        };
    };

    const rows = contests?.map(createData);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (isLoading) return <CircularProgress />;

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "calc(100vh - 116px)" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id} // Use row.id as the key
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.id === "actions" ? (
                                                        <></>
                                                    ) : column.format &&
                                                      typeof value === "number" ? (
                                                        column.format(value)
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default MyWinningContests;
