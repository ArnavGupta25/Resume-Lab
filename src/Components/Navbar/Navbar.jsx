import { Box, Flex, HStack, IconButton, useDisclosure, useColorMode, useColorModeValue, Stack, Button } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import logo from './../../Assets/logo.png';
import { useContext } from 'react';
import ResumeContext from '../../Context/ResumeContext';

export default function Navbar() {
    const { setShowComponent, setSelectBtn, setSignup, signedin, setSignedin, setSelectedData } = useContext(ResumeContext);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const handleNavigation = (route, callback) => {
        callback();
        navigate(route);
    };

    const handleProtectedRoute = (route) => {
        if (!signedin) {
            alert('Please login to see your resumes');
            navigate('/login');
        } else {
            setSelectedData(null);
            navigate(route);
        }
    };

    return (
        <>
            <Box id='navbar' bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box as="button" onClick={() => handleNavigation('/', () => {
                        setShowComponent(false);
                        setSelectBtn(true);
                        setSelectedData(null);
                    })}>
                        <Box><img style={{ height: '44px' }} className='logo' src={logo} alt="logo" /></Box>
                    </Box>

                    <HStack spacing={8} alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <Box as="button" onClick={() => handleNavigation('/', () => {
                                setShowComponent(false);
                                setSelectBtn(true);
                                setSelectedData(null);
                            })} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>Home</Box>
                            <Box as="button" onClick={() => handleNavigation('/about', () => {
                                setSelectedData(null);
                            })} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>About</Box>
                            <Box as="button" onClick={() => handleProtectedRoute('/data')} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>My Resumes</Box>
                            {
                                !signedin && (
                                    <>
                                        <Box as="button" onClick={() => handleNavigation('/login', () => {
                                            setSignup(false);
                                            setSelectedData(null);
                                        })} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>Login</Box>
                                        <Box as="button" onClick={() => handleNavigation('/login', () => {
                                            setSignup(true);
                                            setSelectedData(null);
                                        })} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>Signup</Box>
                                    </>
                                )
                            }
                            {
                                signedin && (
                                    <Box as="button" onClick={() => {
                                        setSignedin(false);
                                        localStorage.removeItem('user');
                                        setSelectedData(null);
                                        navigate('/');
                                    }} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>Logout</Box>
                                )
                            }
                        </HStack>
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </HStack>

                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <Box as="button" onClick={() => handleNavigation('/', () => {
                                setShowComponent(false);
                                setSelectBtn(true);
                                setSelectedData(null);
                            })} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>Home</Box>
                            <Box as="button" onClick={() => handleNavigation('/about', () => {
                                setSelectedData(null);
                            })} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>About</Box>
                            <Box as="button" onClick={() => handleProtectedRoute('/data')} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>My Resumes</Box>
                            {
                                !signedin && (
                                    <>
                                        <Box as="button" onClick={() => handleNavigation('/login', () => {
                                            setSignup(false);
                                            setSelectedData(null);
                                        })} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>Login</Box>
                                        <Box as="button" onClick={() => handleNavigation('/login', () => {
                                            setSignup(true);
                                            setSelectedData(null);
                                        })} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>Signup</Box>
                                    </>
                                )
                            }
                            {
                                signedin && (
                                    <Box as="button" onClick={() => {
                                        setSignedin(false);
                                        localStorage.removeItem('user');
                                        setSelectedData(null);
                                        navigate('/');
                                    }} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.200' }}>Logout</Box>
                                )
                            }
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
