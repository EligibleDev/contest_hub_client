import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import useMain from "../../hooks/useMain/useMain";
import toast from "react-hot-toast";
import { getToken } from "../../api/auth";

const Login = () => {
    const { signIn } = useMain();

    const handleLogin = async (event) => {
        const toastId = toast.loading("Logging in...");

        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const result = await signIn(email, password);
            await getToken(result?.user?.email);
            toast.success("Login successful", { id: toastId });
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    };

    return (
        <>
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
                    onSubmit={handleLogin}
                >
                    <Typography variant="h2" sx={{ fontSize: "35px", fontWeight: "600" }}>
                        Login
                    </Typography>

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
                    <Button type="submit" sx={{ width: "100%" }} variant="contained" size="large">
                        Login
                    </Button>

                    <Typography sx={{}} variant="p">
                        New Here?{" "}
                        <Link
                            to="/register"
                            style={{ color: "#e74c3c", fontWeight: "600" }}
                        >
                            Register{" "}
                        </Link>
                    </Typography>
                </form>

                <GoogleAuth />
            </div>
        </>
    );
};

export default Login;
