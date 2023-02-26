import React, {useEffect} from 'react'
import { Paper,Typography, Divider, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import CommentSection from './CommentSection';
import noImages from '../../images/noImages.png';
import { getPost, getPostsBySearch } from '../../actions/posts';

const PostDetails = () => {
  
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id)); //post의 id값이 바뀜에 따라 해당 포스트 id에 맞는 것을 가져옴
  }, [id]);

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })); //같은 태그의 포스트를 검색해서 추천해주는 로직
    }
  }, [post]);

  if(!post) return null; //post를 전달받지 못하면 작동 안하도록
  
  const recommendedPosts = posts.filter( ({_id}) => _id !== post._id ); //포스트 id값이 동일한 것을(자기자신) 추천하지 않음

  if(isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper} >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const openPost = (_id) => navigate(`/posts/${_id}`);


  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">tags: {post?.tags?.map((tag) => `#${tag} `)}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography color="primary" variant="body2">작성자: {post.name}</Typography>
          <Typography color="primary" variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || noImages} alt={post.title} />
        </div>
      </div>

      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">연관 포스트:</Typography>
          <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                <div className={classes.recommendedPost} style={{ margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                  <Typography className={classes.recommendedPost_title} gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{(message?.length > 100 ? `${message.slice(0,100)}...`: message )}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              ))}
            </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails