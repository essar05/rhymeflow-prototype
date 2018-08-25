import React from 'react'
import {connect} from "react-redux";
import {Nav, NavItem, Navbar, NavbarBrand, NavLink} from "reactstrap";
import '../styles/NavBar.css'

const NavBar = ({user}) => {
    if(user === null) return '';

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand className='logo' href="/">RhymeFlow</NavbarBrand>

            <Nav horizontal='end' className='ml-auto' navbar>
                <NavItem>
                    <span className='text-white nav-text'>Welcome, {user['display_name']}</span>
                </NavItem>
                <NavItem>
                    <NavLink href='/logout'>Logout</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

const mapStateToProps = state => ({
    user: state.session.user
});

export default connect(
    mapStateToProps
)(NavBar);