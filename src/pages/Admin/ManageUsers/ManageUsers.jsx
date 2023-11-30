import { useQuery } from "@tanstack/react-query";
import { getAllUsers, updateRole } from "../../../api/auth";
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageUsers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [role, setRole] = useState("");

    const {
        data: users,
        isLoading,
        refetch,
    } = useQuery({
        queryFn: async () => await getAllUsers(),
        queryKey: ["users"],
    });

    console.log(users)

    const columns = [
        { id: "name", label: "Name", minWidth: 100 },
        { id: "id", label: "ID", minWidth: 100 },
        { id: "email", label: "Email", minWidth: 100 },
        { id: "role", label: "Role", minWidth: 75 },
        { id: "actions", label: "Actions", minWidth: 200 },
    ];

    const createData = (user) => {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    };

    const rows = users?.map(createData);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleUpdateRole = async (email) => {
        const toastId = toast.loading("loading...");

        try {
            await updateRole(email, role);
            refetch();
            toast.success("User role updated", { id: toastId });
            console.log(email, role);
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
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.id === "actions" ? (
                                                        <>
                                                            <FormControl
                                                                sx={{ width: "100%" }}
                                                            >
                                                                <InputLabel id="demo-simple-select-label">
                                                                    change role
                                                                </InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Type"
                                                                    onChange={(e) =>
                                                                        setRole(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                >
                                                                    <MenuItem value="participant">
                                                                        Participant
                                                                    </MenuItem>
                                                                    <MenuItem value="creator">
                                                                        Creator
                                                                    </MenuItem>
                                                                    <MenuItem value="admin">
                                                                        Admin
                                                                    </MenuItem>
                                                                </Select>
                                                            </FormControl>

                                                            <Button
                                                                onClick={() =>
                                                                    handleUpdateRole(
                                                                        row?.email
                                                                    )
                                                                }
                                                            >
                                                                Update
                                                            </Button>
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

export default ManageUsers;
