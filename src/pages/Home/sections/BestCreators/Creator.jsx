/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../../api/auth";
import { CircularProgress, Paper, Typography } from "@mui/material";

const Creator = ({ email, total }) => {
    const { data: creator, isLoading } = useQuery({
        queryFn: async () => await getUser(email),
        queryKey: ["creator", email],
    });

    if (isLoading) return <CircularProgress />;

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <img
                style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "555px",
                }}
                src={creator?.image}
                alt=""
            />
            <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                {creator?.name}
            </Typography>
            <Typography gutterBottom>Total {total} contests</Typography>
            <Typography>
                Meet {creator?.name}, a visionary contest creator who turns imagination
                into reality. With a background in graphic design and a passion for
                storytelling, Alice crafts contests that inspire and challenge
                participants to unleash their creative genius
            </Typography>
        </Paper>
    );
};

export default Creator;
