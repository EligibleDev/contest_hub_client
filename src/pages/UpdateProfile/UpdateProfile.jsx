import { Button, Paper, TextField } from "@mui/material";
import toast from "react-hot-toast";
import useMain from "../../hooks/useMain/useMain";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const { imageUpload, updateUserProfile } = useMain();
    const navigate = useNavigate()

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        const toastId = toast.loading("loading...");

        const name = event.target.name.value;
        const image = event.target.image.files[0];

        try {
            const imageData = await imageUpload(image);
            await updateUserProfile(name, imageData?.data?.display_url);
            toast.success("Successfully updated", { id: toastId });
            navigate('/dashboard')
        } catch (error) {
            console.error(error);
            toast.error(error.message, { id: toastId });
        }
    };

    return (
        <div
            style={{
                height: "calc(100vh - 150px)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                sx={{
                    width: { xs: "90%", sm: "80%", lg: "50%" },
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                elevation={3}
            >
                <form style={{ padding: "1.5rem" }} onSubmit={handleUpdateProfile}>
                    <TextField
                        required
                        sx={{ width: "100%", mb: "1.5rem" }}
                        type="text"
                        label="Name"
                        name="name"
                    />

                    <TextField
                        required
                        sx={{ width: "100%" }}
                        type="file"
                        name="image"
                        accept="image/*"
                    />

                    <Button type="submit" sx={{ mt: "1rem" }}>Update Profile</Button>
                </form>
            </Paper>
        </div>
    );
};

export default UpdateProfile;
