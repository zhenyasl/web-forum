import React, { useContext, useState, useEffect } from 'react';

import { Container, Nav, Navbar as NavBarBs } from 'react-bootstrap';
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

    return (
        <NavBarBs sticky="top" className={`shadow-sm mb-3 ${styles.navbar}`}>
            <Container>
                <Nav className={`me-auto ${styles.navbarNav}`}>
                    <NavLink to="/" className={styles.navLink}>
                        Home
                    </NavLink>
                    {user ? (
                        <span className={styles.userName}>{user}</span>
                    ) : (
                        <NavLink to="/login" className={styles.navLink}>
                            Login
                        </NavLink>
                    )}
                    <NavLink to="/login" className={styles.navLink}>
                        Login
                    </NavLink>
                    <NavLink to="/my-comments" className={styles.navLink}>
                        My comments
                    </NavLink>
                </Nav>
            </Container>
        </NavBarBs>
    );
}

export default NavigationBar;
