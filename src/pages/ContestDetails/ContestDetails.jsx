import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useMain from "../../hooks/useMain/useMain";
import { Button, Container, Grid, Typography } from "@mui/material";
import Countdown from "react-countdown";
import { useQuery } from "@tanstack/react-query";

const ContestDetails = () => {
    const { id } = useParams();
    const [contest, setContest] = useState({});
    const { server } = useMain();

    useEffect(() => {
        fetch(`${server}/contest/${id}`)
            .then((res) => res.json())
            .then((data) => setContest(data));
    }, [server, id]);
    console.log(contest);

   

    return (
        <>
            <Container
                sx={{
                    p: "0px !important",
                }}
                maxWidth={false}
            >
                <img
                    style={{ width: "100%", height: "600px", objectFit: "cover" }}
                    src={contest?.image}
                    alt=""
                />
            </Container>
            <Container>
                <Grid
                    sx={{ py: "80px" }}
                    container
                    justifyContent={"space-between"}
                    spacing={1}
                >
                    <Grid xs={12} lg={6} item container>
                        <Typography sx={{ fontWeight: "700" }} variant="h2">
                            {contest?.name}
                        </Typography>
                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                            item
                            container
                        >
                            <Typography>
                                <b> {contest?.attemptedCount} </b>People Joined
                            </Typography>

                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "5px",
                                }}
                            >
                                Organized by
                                <img
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                    src={contest?.creatorInfo?.photoURL}
                                    alt={contest?.creatorInfo?.displayName}
                                />
                                <Typography>
                                    {contest?.creatorInfo?.name}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Typography
                            gutterBottom
                            sx={{
                                fontWeight: "600",
                                fontSize: "22px",
                                pt: "20px",
                                width: "100%",
                            }}
                        >
                            Task Description:
                        </Typography>
                        <Typography gutterBottom>
                            {contest?.taskSubmissionText}
                        </Typography>

                        <Typography
                            gutterBottom
                            sx={{ fontWeight: "600", fontSize: "22px", width: "100%" }}
                        >
                            Description:
                        </Typography>
                        <Typography gutterBottom>{contest?.description}</Typography>
                    </Grid>

                    <Grid
                        sx={{
                            border: "1px solid black",
                            flexDirection: "column",
                            padding: "1rem !important",
                            justifyContent: "start",
                        }}
                        xs={12}
                        lg={5}
                        item
                        container
                    >
                        <Countdown
                            date={new Date(contest?.deadline)}
                            renderer={({ days, hours, minutes, seconds, completed }) => {
                                if (completed && contest?.winnerInfo?.email) {
                                    return (
                                        <>
                                            <span>Contest has ended!</span>;
                                            <img
                                                style={{
                                                    width: "100%",
                                                    paddingBottom: "1rem",
                                                }}
                                                src={contest?.winnerInfo?.image}
                                                alt=""
                                            />
                                            <Typography gutterBottom>
                                                Winner of the contest :{" "}
                                                <b>{contest?.winnerInfo?.name}</b>
                                            </Typography>
                                        </>
                                    );
                                } else if (completed) {
                                    return <span>Contest has ended!</span>;
                                } else {
                                    return (
                                        <>
                                            <Typography
                                                gutterBottom
                                                sx={{
                                                    textTransform: "capitalize",
                                                    fontSize: "18px",
                                                }}
                                                variant="h4"
                                            >
                                                {days} days {hours} hours {minutes}{" "}
                                                minutes {seconds} Seconds Left
                                            </Typography>{" "}
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                                item
                                            >
                                                <Typography>
                                                    $
                                                    <b style={{ color: "#e74c3c" }}>
                                                        {contest?.price}
                                                    </b>
                                                </Typography>

                                                <Link
                                                    to={`/register_contest/${contest?._id}`}
                                                >
                                                    <Button
                                                        size="large"
                                                        variant="contained"
                                                    >
                                                        Register Now
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </>
                                    );
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ContestDetails;
