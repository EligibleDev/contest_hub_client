import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import useMain from "../../hooks/useMain/useMain";
import { getToken, saveUser } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
    const { signInWithGoogle } = useMain();
    const navigate = useNavigate();

    const handleGoogleAuth = async () => {
        const toastId = toast.loading("Logging in...");

        try {
            const result = await signInWithGoogle();
            const dbResponse = await saveUser(result?.user);
            await getToken(result?.user?.email);
            toast.success("Google Login Successful", { id: toastId });
            navigate('/dashboard')
        } catch (error) {
            console.error(error);
            toast.error(error?.message, { id: toastId });
        }
    };

    return (
        <Button
            onClick={handleGoogleAuth}
            startIcon={<Google />}
            sx={{ width: "400px", mt: "1rem" }}
            variant="contained"
            size="large"
        >
            Continue with Google
        </Button>
    );
};

export default GoogleAuth;
