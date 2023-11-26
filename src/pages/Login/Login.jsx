import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
    const handleLogin = (event) => {
        event.preventDefault();
        console.log(event.target.email.value);
    };

    return (
        <>
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
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
                        sx={{ width: "100%" }}
                        type="email"
                        label="Email"
                        name="email"
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        type="password"
                        label="Password"
                        name="password"
                    />
                    <Button sx={{ width: "100%" }} variant="contained" size="large">
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
            </div>
        </>
    );
};

export default Login;
