import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';

import Passbook from './pages/Passbook';
import Charts from './pages/Charts';


function App() {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    return (
        <Router>
            <div className="App">
                <Navbar color="primary" dark expand="md">
                    <NavbarBrand href="/">Account Details</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} />
                    <Collapse navbar isOpen={!collapsed}>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/"><NavLink>PassBook</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/charts"><NavLink >Charts</NavLink></Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container>
                    <Switch>
                        <Route path="/charts"><Charts /></Route>
                        <Route path="/"><Passbook /></Route>
                    </Switch>
                </Container>
            </div>
        </Router >
    );
}
export default App;
