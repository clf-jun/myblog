import React, {useEffect} from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {getPosts} from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination 
        classes={{ ul: classes.ul }}
        count={numberOfPages}  /* 여기서 받아오는 numberOfPages 값에 따라 페이지가 늘어난다 근데 지금 안늘어남 ->뭔가 상태값 전달 과정에서 문제있는듯 */
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
            <PaginationItem { ...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
    />
  )
}

export default Paginate;