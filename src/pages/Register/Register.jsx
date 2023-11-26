import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useMain from "../../hooks/useMain/useMain";
import { getToken, saveUser } from "../../api/auth";
import toast from "react-hot-toast";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

const Register = () => {
    const { imageUpload, updateUserProfile, createUser } = useMain();

    const handleRegister = async (event) => {
        event.preventDefault();
        const toastId = toast.loading("Working on It...");

        const name = event.target.name.value;
        const image = event.target.image.files[0];
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const imageData = await imageUpload(image);
            const result = await createUser(email, password);
            await updateUserProfile(name, imageData?.data?.display_url);
            const dbResponse = await saveUser(result?.user);
            await getToken(result?.user?.email);

            toast.success("Successfully Registered", { id: toastId });
        } catch (error) {
            console.log(error);
            toast.error(error?.message, { id: toastId });
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form
                style={{
                    width: "400px",
                    display: "flex ",
                    flexDirection: "column",
                    gap: "1rem",
                }}
                onSubmit={handleRegister}
            >
                <Typography variant="h2" sx={{ fontSize: "35px", fontWeight: "600" }}>
                    Register
                </Typography>

                <TextField
                    required
                    sx={{ width: "100%" }}
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

                <TextField
                    required
                    sx={{ width: "100%" }}
                    type="email"
                    label="Email"
                    name="email"
                />
                <TextField
                    required
                    sx={{ width: "100%" }}
                    type="password"
                    label="Password"
                    name="password"
                />

                <Button
                    type="submit"
                    sx={{ width: "100%" }}
                    variant="contained"
                    size="large"
                >
                    Register
                </Button>

                <Typography sx={{}} variant="p">
                    Already Have an Account?{" "}
                    <Link to="/login" style={{ color: "#e74c3c", fontWeight: "600" }}>
                        Login{" "}
                    </Link>
                </Typography>
            </form>
            <GoogleAuth/>
        </div>
    );
};

export default Register;
