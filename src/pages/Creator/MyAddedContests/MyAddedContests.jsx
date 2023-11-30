import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { deleteContest, getCreatorSpecificContest } from "../../../api/contests";
import { useQuery } from "@tanstack/react-query";
import { Button, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import useMain from "../../../hooks/useMain/useMain";
import { Link } from "react-router-dom";

const MyAddedContests = () => {
    const { user } = useMain();

    const {
        data: contests,
        isLoading,
        refetch,
    } = useQuery({
        queryFn: async () => await getCreatorSpecificContest(user?.email),
        queryKey: ["contests"],
    });

    const columns = [
        { id: "name", label: "Name", minWidth: 200 },
        { id: "attemptedCount", label: "Attempted Count", minWidth: 150 },
        { id: "deadline", label: "Deadline", minWidth: 100 },
        { id: "status", label: "Status", minWidth: "75" },
        { id: "actions", label: "Actions", minWidth: "100" },
    ];

    const createData = (contest) => {
        return {
            id: contest._id,
            name: contest.name,
            attemptedCount: contest.attemptedCount,
            status: contest.status,
            deadline: contest.deadline,
        };
    };

    const rows = contests?.map(createData);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = async (contestId) => {
        const toastId = toast.loading("Deleting...");
        try {
            await deleteContest(contestId);
            toast.success("Deleted", { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error(error.message, { id: toastId });
        } finally {
            refetch();
        }
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
                                                        <>
                                                            {row.status === "pending" && (
                                                                <>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                row.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                    <Link
                                                                        to={`/dashboard/update_contest/${row?.id}`}
                                                                    >
                                                                        <Button>
                                                                            Edit
                                                                        </Button>
                                                                    </Link>
                                                                </>
                                                            )}
                                                            <Link to={`/dashboard/submissions/${row.id}`}>
                                                            <Button>
                                                                See submissions
                                                            </Button></Link>
                                                        </>
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

export default MyAddedContests;
