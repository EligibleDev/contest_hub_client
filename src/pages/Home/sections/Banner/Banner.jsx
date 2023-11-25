import { Container, Typography } from "@mui/material";

const Banner = () => {
    return (
        <Container
            sx={{ height: "calc(100vh - 65px)", p: "0px !important", position: "relative" }}
            maxWidth={false}
            className="banner"
        >
            <video src="/banner-bg.mp4" autoPlay loop muted playsInline />
            <div>
                  <Typography variant="h2" sx={{textAlign: 'center', fontWeight: '700', width: "60%"}}>
                        Find the Ultimate Contest for You
                  </Typography>

                  
            </div>
        </Container>
    );
};

export default Banner;
