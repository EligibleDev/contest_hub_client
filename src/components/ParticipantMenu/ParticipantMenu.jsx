import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const ParticipantMenu = () => {
      return (
            <List>
            <Link to="/dashboard/my_participated_contests">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Participated Contests"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/dashboard/my_winning_contests">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <EmojiEventsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Winning Contests"} />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
      );
};

export default ParticipantMenu;