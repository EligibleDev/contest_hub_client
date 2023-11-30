import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import useMain from "../../hooks/useMain/useMain";
import { useQuery } from "@tanstack/react-query";
import { getSingleContest, updateContest } from "../../api/contests";
import { useParams } from "react-router-dom";

const UpdateContest = () => {
    const { categories } = useMain();
    const { id } = useParams();

    const { data: oldContest, isLoading } = useQuery({
        queryFn: async () => await getSingleContest(id),
        queryKey: ["oldContest"],
    });

    const handleUpdate = async (event) => {
        const toastId = toast.loading("Updating...");
        event.preventDefault();

        const name = event.target.name.value;
        const price = event.target.price.value;
        const image = event.target.image.value;
        const prize = event.target.prize.value;
        const task = event.target.task.value;
        const description = event.target.description.value;
        const category = event.target.category.value;
        const deadline = event.target.deadline.value;

        try {
            const newContest = {
                name,
                image,
                description,
                price,
                prizeMoney: prize,
                taskSubmissionText: task,
                category,
                deadline,
            };
            const result = await updateContest(id, newContest);
            console.log(result);
            toast.success("Updated", { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error(error.message, { id: toastId });
        }
    };

    if (isLoading) return <CircularProgress />;

    return (
        <Box sx={{ width: "100%" }}>
            <form
                onSubmit={handleUpdate}
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Grid container spacing={1}>
                    <Grid xs={11} sm={6} item>
                        <TextField
                            defaultValue={oldContest?.name}
                            required
                            sx={{ width: "100%" }}
                            label="Name of the Contest"
                            name="name"
                        />
                    </Grid>

                    <Grid xs={11} sm={6} item>
                        <TextField
                            defaultValue={oldContest?.price}
                            required
                            sx={{ width: "100%" }}
                            label="Price"
                            name="price"
                            type="number"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid xs={11} sm={6} item>
                        <TextField
                            defaultValue={oldContest?.image}
                            required
                            sx={{ width: "100%" }}
                            type="url"
                            name="image"
                            label="Image URL"
                        />
                    </Grid>

                    <Grid xs={11} sm={6} item>
                        <TextField
                            defaultValue={oldContest?.prizeMoney}
                            required
                            sx={{ width: "100%" }}
                            label="Prize Money"
                            name="prize"
                            type="number"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid xs={11} sm={6} item>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                // val={oldContest?.category}
                                value={oldContest?.category}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Type"
                                name="category"
                            >
                                {categories.map((item) => (
                                    <MenuItem key={item?.label} value={item?.value}>
                                        {item?.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={11} sm={6} item>
                        <TextField
                            defaultValue={oldContest?.deadline}
                            required
                            sx={{ width: "100%" }}
                            name="deadline"
                            type="date"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid xs={11} sm={6} item>
                        <textarea
                            defaultValue={oldContest?.taskSubmissionText}
                            required
                            style={{
                                width: "100%",
                                height: "100px",
                                padding: "8px",
                                boxSizing: "border-box",
                                borderRadius: "5px",
                            }}
                            name="task"
                            placeholder="Task"
                        ></textarea>
                    </Grid>

                    <Grid xs={11} sm={6} item>
                        <textarea
                            defaultValue={oldContest?.description}
                            required
                            style={{
                                width: "100%",
                                height: "100px",
                                padding: "8px",
                                boxSizing: "border-box",
                                borderRadius: "5px",
                            }}
                            name="description"
                            placeholder="Description"
                        ></textarea>
                    </Grid>
                </Grid>
                <Button type="submit" size="large" variant="contained">
                    Update
                </Button>
            </form>
        </Box>
    );
};

export default UpdateContest;
