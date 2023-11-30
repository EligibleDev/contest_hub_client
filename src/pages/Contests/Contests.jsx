import { useEffect, useState } from "react";
import useMain from "../../hooks/useMain/useMain";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Contests = () => {
    const [contests, setContests] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const { server, categories } = useMain();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrentCategory(categories[newValue].value);
    };

    useEffect(() => {
        fetch(`${server}/contests?category=${currentCategory}`)
            .then((res) => res.json())
            .then((data) => setContests(data));
    }, [currentCategory, server]);

    return (
        <>
            <Container sx={{ py: "80px" }}>
                <Title text="All Contests" />

                <Grid
                    sx={{
                        pb: "5px",
                        overflowX: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Tabs
                        sx={{ py: "40px" }}
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="scrollable"
                        aria-label="full width tabs example"
                    >
                        {categories?.map((item) => (
                            <Tab key={item?.value} label={item?.label} />
                        ))}
                    </Tabs>
                    {contests?.length ? (
                        <Grid spacing={3} container>
                            {contests?.map((contest) => (
                                <Grid item xs={12} sm={6} lg={3} key={contest?._id}>
                                    <Card sx={{ textAlign: "left" }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={contest?.image}
                                            alt={contest?.name}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {contest?.name}
                                            </Typography>

                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {typeof contest.description === "string"
                                                    ? contest.description.slice(0, 100)
                                                    : contest.description}
                                                ...
                                            </Typography>

                                            <Typography>
                                                {contest?.attemptedCount} People Joined
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`/contest/${contest?._id}`}>
                                                <Button size="small" color="primary">
                                                    details
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <p>no data</p>
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default Contests;
