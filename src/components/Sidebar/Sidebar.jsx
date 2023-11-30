import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListIcon from "@mui/icons-material/List";
import { useState } from "react";
import { Hidden } from "@mui/material";
import { Link } from "react-router-dom";
import useRole from "../../hooks/useRole/useRole";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminMenu from "../AdminMenu/AdminMenu";
import CreatorMenu from "../CreatorMenu/CreatorMenu";
import ParticipantMenu from "../ParticipantMenu/ParticipantMenu";
import { Home, Logout } from "@mui/icons-material";
import useMain from "../../hooks/useMain/useMain";

const Sidebar = () => {
    const [role] = useRole();
    const {logOut} = useMain()
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={["dashboard"]} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={"inbox"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <Hidden mdUp>
                <Box
                    sx={{
                        position: "sticky",
                        top: "0px",
                        right: "0px",
                        left: "0px",
                        width: "100%",
                        py: "1rem",
                        background: "#e3e6e8",
                    }}
                >
                    <Button color="primary">
                        <ListIcon onClick={toggleDrawer("left", true)} />
                    </Button>
                </Box>
                <Drawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                >
                    {list("left")}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Box
                    sx={{
                        width: "100%",
                        borderRight: "1px solid grey",
                        minHeight: "100vh",
                    }}
                    role="presentation"
                >
                    <List>
                        <Link to="/dashboard">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Dashboard"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary={"Go to Home"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                            <ListItem disablePadding>
                                <ListItemButton onClick={logOut}>
                                    <ListItemIcon>
                                        <Logout />
                                    </ListItemIcon>
                                    <ListItemText primary={"Logout"} />
                                </ListItemButton>
                            </ListItem>
                    </List>
                    <Divider />
                    {role === "participant" && <ParticipantMenu />}
                    {role === "creator" && <CreatorMenu />}
                    {role === "admin" && <AdminMenu />}
                </Box>
            </Hidden>
        </>
    );
};

export default Sidebar;
