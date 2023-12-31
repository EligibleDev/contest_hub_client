import { useState } from "react";
import {
    Divider,
    ListItemIcon,
    Tooltip,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    MenuItem,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useMain from "../../hooks/useMain/useMain";
import toast from "react-hot-toast";

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, logOut } = useMain();
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const pages = [
        {
            label: "Home",
            link: "/",
        },
        {
            label: "All Contests",
            link: "/contests",
        },
    ];

    return (
        <>
            <AppBar position="sticky">
                <Container sx={{ mx: "auto" }} maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {pages.map((page) => (
                                    <Link
                                        style={{
                                            color: "#e74c3c",
                                        }}
                                        key={page?.link}
                                        to={page?.link}
                                    >
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                {page?.label}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>

                        <img className="logo" src="/logo.png" alt="" />

                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {pages.map((page) => (
                                <Link key={page?.link} to={page?.link}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                            fontFamily: "poppins",
                                        }}
                                    >
                                        {page?.label}
                                    </Button>
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {user ? (
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar alt={user?.displayName} src={user?.photoURL} />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Link to="/login">
                                    <Button
                                        sx={{ fontWeight: "700", fontFamily: "poppins" }}
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        login
                                    </Button>
                                </Link>
                            )}

                            <Menu
                                anchorEl={anchorElUser}
                                id="account-menu"
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                onClick={handleCloseUserMenu}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        "&:before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform: "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem
                                    sx={{
                                        display: "flex",
                                        justifyContent: "start",
                                        gap: "7px",
                                    }}
                                    onClick={handleCloseUserMenu}
                                >
                                    <img
                                        width="34px"
                                        className="header-profile"
                                        src={user?.photoURL}
                                        alt=""
                                    />
                                    {user?.displayName}
                                </MenuItem>
                                <MenuItem onClick={()=> {
                                    handleCloseUserMenu()
                                    navigate("/dashboard")
                                }}>
                                    <Avatar /> Dashboard
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        logOut();
                                        toast.success('Logout Successful')
                                    }}
                                >
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Header;
