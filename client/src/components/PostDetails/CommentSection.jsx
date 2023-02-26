import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

import DeleteIcon from '@material-ui/icons/Delete';
import { commentDelete } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment('');

    commentsRef.current.scrollIntoView({ behavior: 'smooth'  });
  };

  const deleteHandler = () => {
    dispatch(commentDelete(post._id));
    console.log(post._id);
  }
  // console.log(user, post);

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>댓글</Typography>
            {comments.map((c, i) => (
              <Typography key={i} gutterBottom variant='subtitle1' >
                <strong>{c.split(': ')[0]}</strong>
                {c.split(':')[1]}       
               {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" onClick={deleteHandler}>
                      <DeleteIcon fontSize="medium" /> &nbsp; 삭제
                    </Button>
                  )}
              </Typography>
            ))}
            <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
        <div style={{ width: '100%'}}>
          <div style={{display: 'flex'}}>
            <TextField 
                fullWidth
                row={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button style={{ marginLeft: '5px' }} disabled={!comment.length} variant="contained" color="primary" onClick={handleClick} >
                입력
            </Button>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection