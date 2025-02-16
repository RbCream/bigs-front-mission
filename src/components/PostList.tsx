import React, { useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Button, Typography, Container, Paper } from '@mui/material';

const PostList: React.FC = () => {
  const { posts, fetchPosts } = usePostStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Posts
        </Typography>
        <List>
          {posts.map(post => (
            <ListItem key={post.id} divider>
              <ListItemText 
                primary={<Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{post.title}</Link>}
                secondary={`By ${post.author} on ${new Date(post.createdAt).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
        {isAuthenticated && (
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/posts/new"
            style={{ marginTop: '20px' }}
          >
            Create New Post
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default PostList;
