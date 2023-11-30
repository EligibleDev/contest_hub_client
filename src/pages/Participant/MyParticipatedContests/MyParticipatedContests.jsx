/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { getMyParticipatedContests } from "../../../api/contests";
import useMain from "../../../hooks/useMain/useMain";
import { useEffect, useMemo, useState } from "react";
import { CircularProgress } from "@mui/material";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "price",
        numeric: false,
        disablePadding: false,
        label: "price",
    },
    {
        id: "prizeMoney",
        numeric: false,
        disablePadding: false,
        label: "Prize Money",
    },
    {
        id: "category",
        numeric: false,
        disablePadding: false,
        label: "Category",
    },
    {
        id: "deadline",
        numeric: true,
        disablePadding: false,
        label: "Deadline",
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {headCells?.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {index === headCells.length - 1 ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const MyParticipatedContests = () => {
    const { user } = useMain();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("price");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const {
        data: contests,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => await getMyParticipatedContests(user?.email),
    });

    const createData = (contest) => {
        return {
            id: contest._id,
            name: contest.name,
            price: contest.price,
            prizeMoney: contest.prizeMoney,
            category: contest.category,
            deadline: contest.deadline,
        };
    };

    // const rows = isLoading ? [] : contests?.map(createData);
    // console.log(rows, isLoading);

    useEffect(() => {
        const r = contests?.map(createData);
        setRows(r);
    }, [contests, isLoading]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy))?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
    );

    if (isLoading) return <CircularProgress />;

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer sx={{ maxHeight: "calc(100vh - 150px)" }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows?.length}
                        />

                        <TableBody>
                            {rows?.length && visibleRows?.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            padding="normal"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.price}</TableCell>
                                        <TableCell align="left">
                                            {row.prizeMoney}
                                        </TableCell>
                                        <TableCell align="left">{row.category}</TableCell>
                                        <TableCell align="right">
                                            {row.deadline}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {/* {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default MyParticipatedContests;
