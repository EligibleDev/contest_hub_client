import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const AdminMenu = () => {
    return (
        <List>
            <Link to="/dashboard/manage_contests">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Manage Contests"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/dashboard/manage_users">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SupervisedUserCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Manage Users"} />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
    );
};

export default AdminMenu;
