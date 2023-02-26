import React , {useState} from 'react';
import { Avatar, Button, Paper, Grid, Container, Typography } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined' ;
import useStyles from './styles';
import Input from './Input';
import dotenv from 'dotenv';
import jwt_decode from "jwt-decode";
import { signin, signup} from '../../actions/auth';

dotenv.config();

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN;
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate(); // useHistory has been changed to useNavigate after v6.

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );

    const handleSubmit = (e) => {
        e.preventDefault(); //자동 리로드 방지
        
        if(isSignup) {
            dispatch(signup(formData, navigate)) // database로 정보가 이동 or url변경
        } else {
            dispatch(signin(formData, navigate))
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value}) //현재 입력중인 입력폼의 값만 변경
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        //const decoded =  jwt_decode(res?.credential);
        console.log(res);
        const result = jwt_decode(res?.credential);
        const token = result.sub;
        console.log(result);
            try {
                dispatch({ type: 'AUTH' , data: { result, token }})
                navigate('/');
                // we can't use history.push. New version navigate has already push function.
            } catch (error) {
                console.log(error);
            }
      };
    
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
    console.log(clientId);

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
                {isSignup ? 'Sign up' : 'Sign In'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    { isSignup &&  <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />  }
                </Grid>

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleOAuthProvider clientId={clientId} >
                <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleError}
                    cookiePolicy="single_host_origin"
                />
                </GoogleOAuthProvider>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button className={classes.buttonSignUp} onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' :
                            "Don't have an acount? Sign up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth