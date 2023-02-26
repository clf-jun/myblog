import React from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const App = () => {
  // const user = JSON.parse(localStorage.getItem('profile'));

  const custumTheme = createTheme({
    palette: {
      primary: {
        //main: '#aad212',
        main: '#9acd32',
        contrastText: '#fff'
      },
      secondary: {
        main: '#ff4181',
        contrastText: '#fff'
      },
    },
  });

  return (
    <MuiThemeProvider theme={custumTheme}>
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" /> } />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
          <Route path="/auth" exact element={ <Auth />} />
          {/* <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts/" />} /> */}
           {/* 여기서 로그인,로그아웃 버그가 많이 발생, 아마 캐싱 때문에 유저 정보가 없어도 있는거처럼 나오는것같기도 보완 필요 */}
        </Routes>
      </Container>
    </Router>
    </MuiThemeProvider>
  );
};

export default App;
