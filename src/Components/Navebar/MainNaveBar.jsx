import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import w_logo from "../../Image/First Health Logo_White.png"
import { IoPersonCircle, IoNotificationsCircle } from "react-icons/io5";
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiTwotoneHome, AiFillDatabase, AiFillFile, AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineHelp } from "react-icons/md";
import { BiBriefcase, BiAddToQueue, BiFirstAid, BiReceipt, BiUniversalAccess, BiCuboid, BiLogOut, BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { useMutation } from 'react-query';
// import { getClientListBE } from '../../service/CommonService';

const MainNaveBar = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    useEffect(() => {
        const handleResize = () => {     
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // const {
    //     mutate: getClientListMutate,
    //     data: clientList,
    //     isLoading,
    //     isError,
    //   } = useMutation({
    //     mutationFn: (request) => getClientListBE(request),
    //     onSuccess: (data) => {
    //          console.log("onsuccess->",data);
    //     },
    //     onError: (error) => {
    //       console.log("OnError ->",error);
    
    //     }
    //   });

    // const getClientList = async () => {

    //     const req = {
    //         sort: "A"
    //     }

    //     getClientListMutate(req);
    // }

    return (
        <div className="nav-back">
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={w_logo} id="Nav-logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" id='toggle-icon' />

                    {isSmallScreen === false ?
                        <Navbar.Collapse id="responsive-navbar-nav" className={isSmallScreen ? 'small-screen' : ''}>
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <Nav.Link>
                                    <span className="profile-name">Hi, Jacqueline</span>
                                </Nav.Link>
                                <NavDropdown className="hide-arrow" title={<IoPersonCircle className="symbole-size-icon" />}>
                                    {/* <Link to={"/dami"} className='nav-link'><NavDropdown.Item href="#action/3.1">
                                        <BiUser id="nav-icon-drop" />
                                        Switch profile
                                    </NavDropdown.Item></Link> */}
                                    <NavDropdown.Item href="#action/3.1">
                                        <BiUser id="nav-icon-drop" />
                                        View profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1">
                                        <AiOutlineQuestionCircle id="nav-icon-drop" />
                                        Support
                                    </NavDropdown.Item>

                                    <NavDropdown.Item  >
                                        <AiOutlineQuestionCircle id="nav-icon-drop" />
                                        Client List
                                    </NavDropdown.Item>
                                    
                                    <NavDropdown.Item href="#action/3.1">
                                        <BiLogOut id="nav-icon-drop" />
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        :
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Link to={"/"} id="main-nav-text" >
                                    <Nav.Link href="#features" id="main-nav-text"><AiTwotoneHome id="nav-icon" />Home</Nav.Link>
                                </Link>

                                <NavDropdown title={<div><AiFillDatabase id="nav-icon-drop" />Activity</div>} id="main-nav-text">
                                    <NavDropdown.Item href="#action/3.1" ><Link to={"/mcpsweb/searchbatch"} className="nav-link" ><BiBriefcase id="nav-icon-drop" /> Batch</Link></NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1" ><BiAddToQueue id="nav-icon-drop" />Claim</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1" ><BiFirstAid id="nav-icon-drop" />Patient</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1" ><BiReceipt id="nav-icon-drop" />Provider</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title={<div><AiFillFile id="nav-icon-drop" />Reports</div>} id="main-nav-text">
                                    <NavDropdown.Item href="#action/3.1"><BiUniversalAccess id="nav-icon-drop" />Exception</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1"><BiCuboid id="nav-icon-drop" />Productivity</NavDropdown.Item>
                                </NavDropdown>

                                <Link to={"/help"} id="main-nav-text">
                                    <Nav.Link id="main-nav-text"><MdOutlineHelp id="nav-icon" />Help</Nav.Link>
                                </Link>
                            </Nav>
                            <Nav>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Client"
                                >
                                    <Form.Select aria-label="Floating label select example">
                                        {/* <option>Please select Client</option> */}
                                        <option value="1">VINTEGRA HEALTH CARE INC MEC [30917]</option>
                                        <option value="2">CLAIRE NOEL ENTERPRISES INC [29655]</option>
                                        <option value="2">PATRIOT HOME CARE INC MEC [29717]</option>
                                        <option value="3">TOWNSEND AND ASSOCIATES [27825]</option>
                                        <option value="3">DAVE AND BUSTERS INC [27614]</option>



                                    </Form.Select>
                                </FloatingLabel>

                                <Nav.Link href="#deets"><IoNotificationsCircle className="symbole-size-icon" /></Nav.Link>

                                <NavDropdown className="hide-arrow" title={<IoPersonCircle className="symbole-size-icon" />}>
                                    <NavDropdown.Item href="#action/3.1">
                                        <BiUser id="nav-icon-drop" />
                                        Switch profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1">
                                        <BiUser id="nav-icon-drop" />
                                        View profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1">
                                        <AiOutlineQuestionCircle id="nav-icon-drop" />
                                        Support
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1">
                                        <BiLogOut id="nav-icon-drop" />
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </Nav>
                        </Navbar.Collapse>
                    }

                </Container>
            </Navbar>
        </div>
    );
};

export default MainNaveBar;

