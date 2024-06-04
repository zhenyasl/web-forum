import React, { useContext, useState, useEffect } from 'react';

import { Container, Nav, Navbar as NavBarBs, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';
import UserContext from '../context/UserContext';

function NavigationBar() {
    //const { user, updateUser } = useContext(UserContext);
    const [user, setUser] = useState('');

    useEffect(() => {
        //localStorage.setItem('name', ' ');
        const storedUser = localStorage.getItem('name');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('authToken');
        window.location.reload();
    };

    return (
        <NavBarBs sticky="top" className={`shadow-sm mb-3 ${styles.navbar}`}>
            <Container>
                <Nav className={`me-auto ${styles.navbarNav}`}>
                    <NavLink to="/" className={styles.navLink}>
                        Home
                    </NavLink>
                    <NavLink to="/login" className={styles.navLink}>
                        Login
                    </NavLink>
                    <NavLink to="/my-posts" className={styles.navLink}>
                        My posts
                    </NavLink>
                    <NavLink to="/my-comments" className={styles.navLink}>
                        My comments
                    </NavLink>
                    {user ? (
                        <>
                            <span className={styles.userName}>{user}</span>
                            <span className={styles.logoutButtonContainer}>
                                <Button
                                    variant="outline-primary"
                                    className={styles.logoutButton}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </span>
                        </>
                    ) : (
                        <></>
                    )}
                </Nav>
            </Container>
        </NavBarBs>
    );
}

export default NavigationBar;
