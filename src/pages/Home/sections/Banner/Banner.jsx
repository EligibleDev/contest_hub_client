import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchContestsByCategory } from "../../../../api/contests";

const Banner = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState("");

    const { data: contests, isLoading } = useQuery({
        queryKey: ["contests", category],
        queryFn: async () => searchContestsByCategory(category),
    });

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: " 70%", lg: "50%" },
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ width: "100%" }}
                        label="Search by Categories"
                    />
                    <div>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            contests?.map((contest) => (
                                <Link to={`/contest/${contest?._id}`} key={contest?._id}>
                                    <div style={{ margin: "10px 0px" }}>
                                        <Typography variant="h5">
                                            {contest?.name}
                                        </Typography>
                                        <Typography gutterBottom variant="p">
                                            {contest?.category}
                                        </Typography>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </Box>
            </Modal>
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
                        Unleash your creativity and host the contest of a lifetime!
                        Create, share, and inspire with our user-friendly platform for
                        crafting engaging and unique contests tailored to your vision.
                    </Typography>

                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <Link to="/contests">
                            <Button size="large" variant="contained">
                                See All Contests
                            </Button>
                        </Link>
                        <div onClick={handleOpen} className="fake-input">
                            <SearchIcon />
                            Quick Search...
                        </div>
                    </Grid>
                </div>
            </Container>
        </>
    );
};

export default Banner;
