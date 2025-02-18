import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button } from '@mui/material';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentPost, fetchPost, deletePost } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id, fetchPost]);

  if (!currentPost) return <div>Loading...</div>;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(currentPost.id);
      navigate('/');
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {currentPost.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category: {currentPost.category || 'Unknown'} on {new Date(currentPost.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          {currentPost.content}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Back to List</Button>
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/posts/edit/${currentPost.id}`)}>
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