import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button } from '@mui/material';
import { usePostStore } from '../store/postStore';
import { getCategories } from '../services/postService';
import { PostDetail as PostDetailType } from '../types/post';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentPost, fetchPost, deletePost } = usePostStore();
  const [categories, setCategories] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id, fetchPost]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  if (!currentPost) return <div>Loading...</div>;

  const handleDelete = async () => {
    if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
      await deletePost(currentPost.id);
      navigate('/');
    }
  };

  const postDetail = currentPost as PostDetailType;

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {postDetail.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category: {categories[postDetail.boardCategory ?? 'Unknown'] || 'Unknown'} on {new Date(postDetail.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          {postDetail.content}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Back to List</Button>
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/posts/edit/${postDetail.id}`)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
            Delete
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default PostDetail;