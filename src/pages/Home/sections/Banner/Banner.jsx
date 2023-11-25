import { Button, Container, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Banner = () => {
    return (
        <Container
            sx={{
                height: "calc(100vh - 65px)",
                p: "0px !important",
                position: "relative",
            }}
            maxWidth={false}
            className="banner"
        >
            <video src="/banner-bg.mp4" autoPlay loop muted playsInline />
            <div>
                <Typography
                    gutterBottom
                    variant="h2"
                    sx={{
                        textAlign: "center",
                        fontWeight: "700",
                        width: { xs: "100%", md: "80%", lg: "60%" },
                        fontSize: { xs: "2rem", sm: "3.5rem", lg: "4rem" },
                    }}
                >
                    Find the Ultimate Contest for You
                </Typography>

                <Typography
                    gutterBottom
                    sx={{
                        textAlign: "center",
                        width: { xs: "90%", md: "80%", lg: "55%" },
                        paddingBottom: "1rem",
                    }}
                >
                    Unleash your creativity and host the contest of a lifetime! Create,
                    share, and inspire with our user-friendly platform for crafting
                    engaging and unique contests tailored to your vision.
                </Typography>

                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6px",
                    }}
                >
                    <Button size="large" variant="contained">
                        See All Contests
                    </Button>
                    <div className="fake-input">
                        <SearchIcon />
                        Quick Search...
                        {/* todo: search functionality */}
                    </div>
                </Grid>
            </div>
        </Container>
    );
};

export default Banner;
