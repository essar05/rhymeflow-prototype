import React from 'react'
import {connect} from "react-redux";
import { Nav, NavItem, Navbar, NavbarBrand } from "reactstrap";

const NavBar = ({user}) => {
    if(user === null) return '';

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">RhymeFlow</NavbarBrand>

            <Nav horizontal='end' className='ml-auto' navbar>
                <NavItem>
                    <span className='text-white'>Welcome, {user['display_name']}</span>
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