import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SailingIcon from '@mui/icons-material/Sailing';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import SideBarFormLogIn from '../SideBarFormLogIn/SideBarFormLogIn';
import { userLogOut } from '../../redux/actions/authActions';
import { SET_SHOW_FORM } from '../../redux/types/types';

const pages = ['Points', 'Ways', 'Admin'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  console.log(window.location.href, '000000000000000');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth);
  const photoUser = useSelector((state) => state.photoUser);

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
    console.log('close usermenu');
    setAnchorElUser(null);
  };

  const logoutClick = (e) => {
    e.preventDefault();
    dispatch(userLogOut());
    navigate('/');
  };
  const clickShowForm = () => {
    dispatch({ type: SET_SHOW_FORM });
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: '#53555830' }}>
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <SailingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            THE SAILING CLUB
          </Typography>
          {user.id ? (
            <>
              {/* {auth.admin === true ? ()} */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' }
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  component={Link}
                  to="/map"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Points
                </Button>
                {user.admin ? (
                  <Button
                    component={Link}
                    to="/admin"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Admin
                  </Button>
                ) : null }

                {(window.location.href === 'http://localhost:3000/admin')
                && (
                <Button
                  component={Link}
                  to="/admin"
                  onClick={clickShowForm}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Add user
                </Button>
                )}

              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={`http://localhost:3002/images/${photoUser?.image}` || ''} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={Link} to="/perspage" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      Personal Area
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={logoutClick}>
                    <Typography textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )
            : (
              <div className="public-nav-bar" style={{ width: 'max-content', marginLeft: 'auto' }}>
                <NavLink to="/"><SideBarFormLogIn handleCloseUserMenu={handleCloseUserMenu} /></NavLink>
              </div>
            ) }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
