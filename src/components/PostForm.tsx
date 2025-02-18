import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { getCategories } from '../services/postService';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { Post } from '../types/post';

const StyledPaper = {
  padding: '20px',
  marginTop: '20px'
};

interface PostFormData {
  title: string;
  content: string;
  category: string;
}

const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm<PostFormData>();
  const { createPost, updatePost, currentPost, fetchPost } = usePostStore();
  const [categories, setCategories] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id, fetchPost]);

  useEffect(() => {
    if (id && currentPost) {
      const post = currentPost as Post;
      setValue('title', post.title);
      setValue('content', post.content);
      setValue('category', post.category);
    }
  }, [id, currentPost, setValue]);

  const onSubmit = async (data: PostFormData) => {
    if (id) {
      await updatePost(parseInt(id), data.title, data.content, data.category);
    } else {
      await createPost(data.title, data.content, data.category);
    }
    navigate('/');
  };

  return (
    <Container>
      <Paper elevation={3} style={StyledPaper}>
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
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Category"
                fullWidth
                margin="normal"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled hidden>
                </option>
                {Object.entries(categories).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </TextField>
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
