import { Container, Grid, Typography } from "@mui/material";

const Advertisement = () => {
    return (
        <Container sx={{ p: "80px 0px", textAlign: "center" }}>
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    p: { xs: "1rem", lg: "0px" },
                }}
                container
                spacing={1}
            >
                <Grid
                    sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
                    xs={12}
                    lg={4}
                    item
                >
                    <img
                        style={{ width: "200px", borderRadius: "999px", margin: "auto" }}
                        src="https://t4.ftcdn.net/jpg/02/24/86/95/240_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
                        alt=""
                    />

                    <Typography
                        gutterBottom
                        sx={{ fontSize: "25px", fontWeight: "600" }}
                        variant="h5"
                    >
                        Badhon Ali
                    </Typography>

                    <Typography sx={{ textAlign: "justify" }}>
                        Meet our exceptional participant, Badhon Ali! 🌟 In the spotlight
                        for their remarkable achievements on our contests creation
                        platform, Badhon Ali has demonstrated unparalleled skill,
                        creativity, and dedication. With a passion for excellence, Badhon
                        has not only participated but has triumphed, leaving an indelible
                        mark on the competitions they have engaged in.
                    </Typography>
                </Grid>

                <Grid xs={12} lg={7} sx={{ textAlign: "right" }} item>
                    <Typography sx={{ fontSize: "25px", fontWeight: "600", pt: "3rem" }}>
                        Join a Thriving Community of Competitors!
                    </Typography>

                    <Typography gutterBottom sx={{ pb: "2rem" }}>
                        Our website is home to a vibrant and dynamic community of
                        individuals like you who love a good challenge. With a plethora of
                        competitions hosted regularly, there is always an opportunity to
                        showcase your skills and talents. From creative endeavors to
                        intellectual pursuits, our diverse range of competitions ensures
                        that there is something for everyone.
                    </Typography>

                    <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
                        Encouraging Participation:
                    </Typography>

                    <Typography>
                        Unleash Your Potential – Participate Now! Seize the moment and
                        dive into the world of competition on our platform! Your unique
                        skills and talents deserve to be celebrated, and what better way
                        to showcase them than by participating in our engaging contests.
                        Whether you are an aspiring artist, a strategic thinker, or a
                        problem-solving guru, there is a competition waiting for someone
                        just like you. Don not let your talents remain hidden
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Advertisement;
