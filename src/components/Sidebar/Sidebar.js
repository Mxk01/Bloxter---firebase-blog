import React, { useState } from 'react'
import './Sidebar.css'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Home from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { signOut, getAuth } from 'firebase/auth'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
function Sidebar() {
    let auth = getAuth();
    let history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ul className="sidebar__content">
                {/* <Avatar alt="Remy Sharp" src="https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg" /> */}
                <Tooltip title="Account settings">

                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}
                            src={"https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg"}
                        />

                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },

                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem>
                        <Avatar />
                    </MenuItem>
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <Link to="/user-edit" style={{ textDecoration: "none", color: "black" }}>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                    </Link>




                </Menu>

                {
                    localStorage.getItem('token') ?
                        ('') : (<Link to="/register"  > <LockOpenIcon /> </Link>)
                }
                {
                    localStorage.getItem('token') ? (
                        < ExitToAppIcon onClick={() => {

                            signOut(auth).then(() => {
                                history.push('/login')
                                localStorage.removeItem('token');
                            }).catch(e => console.log(e))

                        }
                        } />) : ('')
                }

                {
                    localStorage.getItem('token') ?
                        (<Link to="/create-post"  >
                            <LibraryAddCheckOutlinedIcon />
                        </Link>) : ""
                }
                {/* <PermContactCalendarIcon /> */}
            </ul >
        </div >
    )
}

export default Sidebar

