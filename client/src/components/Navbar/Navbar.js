import React, {useState, useEffect} from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import logoText from '../../images/logoText.png';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {

const classes = useStyles();
const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); //reducer/auth에서 저장된 application의 정보를 가져온다.
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation(); // url이 바뀔때, 현재 url의 정보를 반환한다.

const logout = () => {
    dispatch({ type: 'LOGOUT'});
    navigate('/');
    setUser(null);
}

useEffect(() => {
    const token = user?.token;
    //만약 토큰이 만료되면 자동으로 로그아웃 시키도록 하는 로직
    //여기서 문제는 구글Oauth가 개편되면서 토큰 방식이 바뀌었다는점.. user.result.exp로 가져와야함. 안그러면 에러
    
    if(token && token.length > 100 ) { //커스텀 로그인
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) logout();

    } else if(token && user?.result?.exp) { //구글 로그인
        const expireTime = user?.result?.exp;
        if(expireTime.exp * 1000 < new Date().getTime()) logout();
    }


    setUser(JSON.parse(localStorage.getItem('profile')));
}, [location])  //url이 바뀌면서 새로운 location 값이 입력되고, 이를 동기화시킴

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
            <img src={logoText} className={classes.image} alt="icon" height="70" />
        </Link>
        <Toolbar className={classes.toolbar}>
            {user?.result ? ( //when login
                <div className={classes.profile}> 
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>로그아웃</Button>
                </div>
            ) : ( //when logout
                <Button component={Link} to="/auth" variant="contained" color="primary">로그인</Button>

            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar