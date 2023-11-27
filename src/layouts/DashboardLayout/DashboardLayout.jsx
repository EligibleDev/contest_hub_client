import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const DashboardLayout = () => {
    return (
        <Grid container>
            <Grid xs={0} md={3} item>
                <Sidebar />
            </Grid>
            <Grid item xs={12} md={9} sx={{ p: "2rem", width: "100%" }}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default DashboardLayout;
