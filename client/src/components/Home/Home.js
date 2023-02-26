import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1; //페이지가 없다면 값이 1임
    const searchQuery = query.get('serchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
  

    const searchPost = () =>{
      if(search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        // navigate('/');
      }
    }

    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
        searchPost();
      }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
  
  return (
    <Grow in>
    <Container maxWidth='xl'>
      <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={9}> {/* 포스트 크기 조절 */}
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField 
              name="search" 
              variant='outlined' 
              label='Search Posts'
              onKeyPress={handleKeyPress}
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
            <ChipInput 
              style={{margin: '10px 0'}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant='outlined'
            />
            <Button onClick={searchPost} className={classes.searchButton } variant="contained" color="primary">검색</Button>
          </AppBar>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          {(!searchQuery && !tags.length) && ( /* 만약 검색중이라면 페이지수가 안나오도록 */
          <Paper elevation={6} className={classes.pagination}>
            <Paginate page={page} />
          </Paper>)}
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home