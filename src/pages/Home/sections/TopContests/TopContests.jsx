import { Button, Container, Grid, Typography } from "@mui/material";
import Title from "../../../../components/Title/Title";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMain from "../../../../hooks/useMain/useMain";

const TopContests = () => {
    const [topContests, setTopContests] = useState([]);
    const { server } = useMain();

    useEffect(() => {
        fetch(`${server}/contests`)
            .then((res) => res.json())
            .then((data) => setTopContests(data));
    }, []);

    return (
        <Container sx={{ p: "80px 0px", textAlign: "center" }} maxWidth="lg">
            <Title text="Top Contests" />

            <Grid mt={4} container>
                {topContests.map((contest) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={12}
                        container
                        sx={{ border: "1px solid red", p: "1.5rem" }}
                        justifyContent="space-between"
                        alignItems={"center"}
                        gap={1 / 2}
                        key={contest?._id}
                    >
                        <Grid item xs={12} lg={5}>
                            <img
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                }}
                                src={contest?.image}
                                alt={contest?.name}
                            />
                        </Grid>

                        <Grid
                            item
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "start",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                            xs={12}
                            lg={4}
                        >
                            <Typography
                                sx={{ fontSize: "1.5rem", fontWeight: "600" }}
                                variant="h3"
                            >
                                {contest?.name}
                            </Typography>

                            <Typography sx={{ textAlign: "left" }}>
                                {typeof contest.description === "string"
                                    ? contest.description.slice(0, 85)
                                    : contest.description}
                                ...
                            </Typography>
                            <Typography
                                variant="p"
                                sx={{ fontSize: "18px", fontWeight: "500" }}
                            >
                                Already{" "}
                                <b style={{ color: "#e74c3c" }}>
                                    {contest?.attemptedCount}
                                </b>{" "}
                                people joined
                            </Typography>
                        </Grid>

                        <Grid sx={{ textAlign: "left" }} item xs={12} lg={2}>
                            {/* todo: set the link properly */}
                            <Link>
                                <Button size="large" variant="contained">
                                    Details
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TopContests;
