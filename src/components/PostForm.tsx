import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';

interface PostFormData {
  title: string;
  content: string;
}

const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm<PostFormData>();
  const { createPost, updatePost, currentPost, fetchPost } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id, fetchPost]);

  useEffect(() => {
    if (id && currentPost) {
      setValue('title', currentPost.title);
      setValue('content', currentPost.content);
    }
  }, [id, currentPost, setValue]);

  const onSubmit = async (data: PostFormData) => {
    if (id) {
      await updatePost(parseInt(id), data.title, data.content);
    } else {
      await createPost(data.title, data.content);
    }
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit Post' : 'Create New Post'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            defaultValue=""
            rules={{ required: 'Content is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Content"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            {id ? 'Update' : 'Create'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default PostForm;
