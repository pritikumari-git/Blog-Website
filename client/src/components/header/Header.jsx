import {
    AppBar,
    Toolbar,
    styled,
    IconButton,
    Box,
    Button,
    Drawer,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Categories from '../home/Categories';

const Component = styled(AppBar)`
    background: white;
    color: black;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Logo = styled('img')`
    height: 40px;
    cursor: pointer;
`;

const NavLinks = styled(Box)`
    display: flex;
    gap: 20px;

    & > a {
        color: black;
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s ease;

        &:hover {
            color: #2874f0;
        }
    }
`;

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    };

    const isLoggedIn = !!sessionStorage.getItem('accessToken'); // Check if user is logged in

    return (
        <>
            <Component position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ display: { xs: 'block', sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Logo
                            src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png"
                            alt="Logo"
                            onClick={() => (window.location.href = '/')}
                        />
                    </Box>

                    {/* Navigation Links */}
                    <NavLinks sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </NavLinks>

                    {/* Login/Logout Button */}
                    <Box>
                        {isLoggedIn ? (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleLogout}
                                component={Link}
                                to="/account"
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Component>

            {/* Drawer for small screens */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box sx={{ width: 250, padding: 2 }}>
                    <Categories />
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
