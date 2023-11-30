import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { declareWinner, getSingleContest } from "../../api/contests";
import { useEffect, useState } from "react";
import {
    Button,
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
import toast from "react-hot-toast";

const Submissions = () => {
    const { id } = useParams();
    const [participants, setParticipants] = useState([]);

    const { data: contest, isLoading, refetch } = useQuery({
        queryFn: async () => getSingleContest(id),
        queryKey: ["contest"],
    });

    useEffect(() => {
        if (contest && contest.participants) {
            setParticipants(contest.participants);
        }
    }, [contest]);

    console.log(contest);

    const columns = [
        { id: "name", label: "Name", minWidth: 200 },
        { id: "email", label: "Email", minWidth: 150 },
        { id: "submission", label: "Submission", minWidth: 100 },
        { id: "actions", label: "Actions", minWidth: "100" },
    ];

    const createData = (participant) => {
        return {
            name: participant?.name,
            email: participant?.email,
            image: participant?.image,
            submission: participant?.submission,
        };
    };

    const rows = participants?.map(createData);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeclareWinner = async (participant) => {
        const toastId = toast.loading("loading...");

        try {
            await declareWinner(id, participant);
            toast.success("Winner Declared", { id: toastId });
            refetch()
        } catch (error) {
            console.error(error);
            toast.error(error.message, { id: toastId });
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
                                        key={row.id}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id}>
                                                    {column.id === "actions" ? (
                                                        contest?.winnerInfo?.email ? (
                                                            <Button disabled>
                                                                Winner Has Been Decided
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() =>
                                                                    handleDeclareWinner(
                                                                        row
                                                                    )
                                                                }
                                                            >
                                                                declare winner
                                                            </Button>
                                                        )
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

export default Submissions;
