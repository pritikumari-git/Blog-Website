import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    width: 100vw; /* Full viewport width */
    background-image: url('${process.env.PUBLIC_URL}/login-background.png');

    @media (max-width: 600px) {
        background: #ffffff; /* White background for small screens */
    }
`;

const Wrapper = styled(Box)`
    width: 90%; /* Responsive width */
    max-width: 400px; /* Limit the maximum width */
    min-width: 300px; /* Ensure minimum width for smaller screens */
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #fff;
    & > div,
    & > button,
    & > p {
        margin-top: 10px;
    }
    @media (max-width: 600px) {
        box-shadow: none; /* Remove shadow on small screens */
    }
`;

const Image = styled('img')({
    width: 120,
    display: 'block',
    margin: '0 auto 20px', // Center the image and add spacing below
});

const LoginButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(90deg, #fb641b, #ff8e53);
    color: #fff;
    height: 50px;
    border-radius: 25px;
    font-weight: bold;
    transition: all 0.3s ease;
    &:hover {
        background: linear-gradient(90deg, #ff8e53, #fb641b);
        box-shadow: 0px 4px 10px rgba(251, 100, 27, 0.5);
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 50px;
    border-radius: 25px;
    font-weight: bold;
    border: 1px solid #2874f0;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    &:hover {
        background: #f0f0f0;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
    text-align: center;
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 1.5;
    margin-top: 10px;
    font-weight: 600;
    text-align: center;
`;

const loginInitialValues = {
    username: '',
    password: '',
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [loading, setLoading] = useState(false);
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL =
        'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        showError(false);
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        setLoading(true);
        let response = await API.userLogin(login);
        setLoading(false);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem(
                'accessToken',
                `Bearer ${response.data.accessToken}`,
            );
            sessionStorage.setItem(
                'refreshToken',
                `Bearer ${response.data.refreshToken}`,
            );
            setAccount({
                name: response.data.name,
                username: response.data.username,
            });

            isUserAuthenticated(true);
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! Please try again later.');
        }
    };

    const signupUser = async () => {
        setLoading(true);
        let response = await API.userSignup(signup);
        setLoading(false);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! Please try again later.');
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <Component>
            <Wrapper>
                <Image src={imageURL} alt="blog" />
                {account === 'login' ? (
                    <>
                        <TextField
                            variant="standard"
                            value={login.username}
                            onChange={(e) => onValueChange(e)}
                            name="username"
                            label="Enter Username"
                        />
                        <TextField
                            variant="standard"
                            value={login.password}
                            onChange={(e) => onValueChange(e)}
                            name="password"
                            label="Enter Password"
                            type="password"
                        />

                        {error && <Error>{error}</Error>}

                        <LoginButton
                            variant="contained"
                            onClick={() => loginUser()}
                           
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </LoginButton>
                        <Text>OR</Text>
                        <SignupButton onClick={() => toggleSignup()} disabled={loading}>
                            Create an account
                        </SignupButton>
                    </>
                ) : (
                    <>
                        <TextField
                            variant="standard"
                            value={signup.name}
                            onChange={(e) => onInputChange(e)}
                            name="name"
                            label="Enter Name"
                        />
                        <TextField
                            variant="standard"
                            value={signup.username}
                            onChange={(e) => onInputChange(e)}
                            name="username"
                            label="Enter Username"
                        />
                        <TextField
                            variant="standard"
                            value={signup.password}
                            onChange={(e) => onInputChange(e)}
                            name="password"
                            label="Enter Password"
                            type="password"
                        />

                        <SignupButton onClick={() => signupUser()}>
                            Signup
                        </SignupButton>
                        <Text>OR</Text>
                        <LoginButton
                            variant="contained"
                            onClick={() => toggleSignup()}
                            disabled={loading}
                        >
                            Already have an account
                        </LoginButton>
                    </>
                )}
            </Wrapper>
        </Component>
    );
};

export default Login;
