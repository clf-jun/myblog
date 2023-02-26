import React, {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import noImages from '../../../images/noImages.png';
import { useNavigate } from 'react-router-dom';
import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

import Modal from '../../Modal/Modal';

const Post = ({ post, setCurrentId }) => { // Post/posts.js로부터 상속
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  /* (user?.result?.googleId || user?.result?._id)에서
  구글아이디 접속시 로컬스토리지에서 가져온 profile에서
  result.googleId라는 란이 없음. 그래서 좋아요 눌렀을때 저장된
  sub의 값과 일치한다면 자신이 좋아요를 눌렀을때 정상적으로 색이 채워진 썸업아이콘으로 바뀜
  */
   const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length >= 2 ? `${post.likes.length } likes` : `${post.likes.length} like` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };


  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteHandler = () => {
    dispatch(deletePost(post._id));
  };

  

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase component="span" className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile || noImages } title={post.title} />

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{(post.title.length > 25 ? `${post.title.slice(0,25)}...`: post.title )}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{(post.message.length > 100 ? `${post.message.slice(0,100)}...`: post.message )}</Typography>
        </CardContent>
      </ButtonBase>

      <CardContent>
        <div className={classes.overlay}>
            <Typography variant="body1">{post.name} &nbsp;&nbsp; {moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
        </div>
      </CardContent>
      
      <CardActions className={classes.cardActions}>
        <Button className={classes.likeButton} size="small" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>

        <div className={classes.privateButton}>
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <Button className={classes.editButton}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              size="small"
            >
              <Edit fontSize="medium" />수정
            </Button>
          )}

        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <>
              <Button size="small" className={classes.deleteButton} onClick={openModal}>
                <DeleteIcon fontSize="medium" /> &nbsp; 삭제
              </Button>
              <Modal
                open={modalOpen}
                close={closeModal}
                deleteHandler={deleteHandler}
                header="정말 삭제하시겠습니까?"
              ></Modal>
            </>
        )}
        </div>
      </CardActions>
    </Card>
  );
};

export default Post;
