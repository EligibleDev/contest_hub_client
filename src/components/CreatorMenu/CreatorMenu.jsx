import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const CreatorMenu = () => {
      return (
            <List>
            <Link to="/dashboard/add_contest">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Add a Contest"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/dashboard/my_added_contests">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Added Contests"} />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
      );
};

export default CreatorMenu;