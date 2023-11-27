import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import useMain from "../../../hooks/useMain/useMain";
import { publishContest } from "../../../api/contests";

const AddContest = () => {
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");
    const { imageUpload, user, categories } = useMain();

    const handlePublish = async (event) => {
        const toastId = toast.loading("Publishing...");
        event.preventDefault();

        const name = event.target.name.value;
        const price = event.target.price.value;
        const image = event.target.image.files[0];
        const prize = event.target.prize.value;
        const task = event.target.task.value;
        const description = event.target.description.value;

        try {
            const imageData = await imageUpload(image);
            toast.success("Published", { id: toastId });
            const newContest = {
                name,
                image: imageData?.data?.display_url,
                attemptedCount: 0,
                description,
                price,
                prizeMoney: prize,
                taskSubmissionText: task,
                category,
                creatorInfo: user,
                deadline,
            };

            await publishContest(newContest);
        } catch (error) {
            console.error(error);
            toast.error(error.message, { id: toastId });
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <form
                onSubmit={handlePublish}
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
                            required
                            sx={{ width: "100%" }}
                            label="Name of the Contest"
                            name="name"
                        />
                    </Grid>

                    <Grid xs={11} sm={6} item>
                        <TextField
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
                            required
                            sx={{ width: "100%" }}
                            type="file"
                            name="image"
                            accept="image/*"
                        />
                    </Grid>

                    <Grid xs={11} sm={6} item>
                        <TextField
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
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Type"
                                onChange={(e) => setCategory(e.target.value)}
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
                            required
                            sx={{ width: "100%" }}
                            name="deadline"
                            onChange={(e) => setDeadline(e.target.value)}
                            type="date"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid xs={11} sm={6} item>
                        <textarea
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
                    Publish
                </Button>
            </form>
        </Box>
    );
};

export default AddContest;
