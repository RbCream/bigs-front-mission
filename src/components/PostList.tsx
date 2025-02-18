import React, { useEffect, useState } from 'react';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Button, Typography, Container, Paper, Box } from '@mui/material';
import styled from 'styled-components';

const StyledCategory = styled.span`
  font-size: 0.75rem;
  color: inherit;
`;

const StyledTitle = styled(Link)`
  text-decoration: none;
  color: #222222;
  font-size: 1.25rem;
  &:visited {
    color: #222222;
  }
`;

const StyledDate = styled.span`
  font-size: 0.875rem;
  color: inherit;
  margin-left: 10px;
`;

const PostList: React.FC = () => {
  const { posts, fetchPosts } = usePostStore();
  const { isAuthenticated } = useAuthStore();
  const [page, setPage] = useState(0);
  const [size] = useState(10); // 페이지당 게시글 수
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const totalPages = await fetchPosts(page, size);
      setTotalPages(totalPages);
    };
    fetchData();
  }, [fetchPosts, page, size]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor(page / 5) * 5;
    const endPage = Math.min(startPage + 5, totalPages);

    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(
        <Button 
          key={i} 
          variant="contained" 
          color={i === page ? 'primary' : 'inherit'} 
          onClick={() => handlePageChange(i)}
          style={{ margin: '0 5px' }}
        >
          {i + 1}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Container >
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Posts
        </Typography>
        <List>
          {posts.map(post => (
            <ListItem key={post.id} divider>
              <ListItemText 
                primary={
                  <Box display="flex" flexDirection="column">
                    <StyledCategory>{post.category}</StyledCategory>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <StyledTitle to={`/posts/${post.id}`}>{post.title}</StyledTitle>
                      <StyledDate>{new Date(post.createdAt).toLocaleDateString()}</StyledDate>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
        <Box display="flex" justifyContent="center" marginTop="20px">
          {renderPageNumbers()}
        </Box>
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
