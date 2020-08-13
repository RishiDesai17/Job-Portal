import React, { memo, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import IconButton from '@material-ui/icons/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './styles/ProfileSideBar.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  buttons: {
    color: 'white', 
    marginBottom: 5,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    position: 'absolute',
    left: 15,
    top: 7,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: 'url(https://i.pinimg.com/originals/56/3b/f1/563bf185ee38a3b78c53e1e83e370e57.png)',
    "&:after": {
        position: "absolute",
        zIndex: "3",
        width: "100%",
        height: "100%",
        content: '""',
        display: "block",
        background: 'black',
        opacity: "0.6"
    }
},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const ProfileSideBar = (props) => {
    const [state, setState] = useState()
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{zIndex: 10}}>
            <h1>abcd</h1>
            <Divider />
            <List>
                <ListItem button className={classes.buttons} style={{ backgroundColor: props.current === "Profile" && '#009ffd' }} onClick={() => {
                    props.setCurrent("Profile")
                    setMobileOpen(false)
                }}> 
                    <ListItemIcon> <PersonIcon style={{ color: "white" }} /> </ListItemIcon>
                    <ListItemText primary='Profile' />
                </ListItem>
                { props.role === "user" ?
                    <>
                        <ListItem button className={classes.buttons} style={{ backgroundColor: props.current === "My Applications" && '#009ffd' }} onClick={() => {
                            props.setCurrent("My Applications")
                            setMobileOpen(false)
                        }}> 
                            <ListItemIcon> <WorkIcon style={{ color: "white" }} /> </ListItemIcon>
                            <ListItemText primary='My Applications' />
                        </ListItem>
                        <ListItem button className={classes.buttons} style={{ backgroundColor: props.current === "Pre-Interviews" && '#009ffd' }} onClick={() => {
                            props.setCurrent("Pre-Interviews")
                            setMobileOpen(false)
                        }}> 
                            <ListItemIcon> <AssignmentIcon style={{ color: "white" }} /> </ListItemIcon>
                            <ListItemText primary='Pre-Interviews' />
                        </ListItem>
                        <ListItem button className={classes.buttons} style={{ backgroundColor: props.current === "Saved" && '#009ffd' }} onClick={() => {
                            props.setCurrent("Saved")
                            setMobileOpen(false)
                        }}> 
                            <ListItemIcon> <BookmarkIcon style={{ color: "white" }} /> </ListItemIcon>
                            <ListItemText primary='Saved jobs' />
                        </ListItem>
                    </>
                :
                    <>
                        <ListItem button className={classes.buttons} style={{ backgroundColor: props.current === "New Job" && '#009ffd' }} onClick={() => {
                            props.setCurrent("New Job")
                            setMobileOpen(false)
                        }}> 
                            <ListItemIcon> <BookmarkIcon style={{ color: "white" }} /> </ListItemIcon>
                            <ListItemText primary='New Job' />
                        </ListItem>
                    </>
                }
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

        return (
            <>
            {/* <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                      
                   <Typography variant="h6" noWrap>
                       Responsive drawer
                   </Typography>
               </Toolbar> 
            </AppBar> */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <nav className={classes.drawer} style={{ backgroundColor: 'red' }} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    )
}

export default memo(ProfileSideBar)