/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useAuth } from '../../utils/context/authContext';
import { getCategories } from '../../utils/data/categoriesData';
import { createPost, updatePost } from '../../utils/data/postsData';

const initialState = {
  title: '',
  imageUrl: '',
  content: '',
  categoryId: 0,
};

const PostForm = ({ obj }) => {
  const [categories, setCategories] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentPost, setCurrentPost] = useState(initialState);
  const currentDate = new Date().toISOString().split('T')[0];
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentPost({
        id: obj.id,
        title: obj.title,
        imageUrl: obj.imageUrl,
        content: obj.content,
        categoryId: obj.categoryId.id,
        publicationDate: obj.publicationDate,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const postUpdate = {
        id: currentPost.id,
        title: currentPost.title,
        publicationDate: currentPost.publicationDate,
        imageUrl: currentPost.imageUrl,
        content: currentPost.content,
        approved: true,
        categoryId: Number(currentPost.categoryId),
        rareUserId: user.uid,

      };
      updatePost(postUpdate)
        .then(() => router.push('/posts/myPosts'));
    } else {
      const post = {
        title: currentPost.title,
        publicationDate: currentDate,
        imageUrl: currentPost.imageUrl,
        content: currentPost.content,
        approved: true,
        categoryId: Number(currentPost.categoryId),
        rareUserId: user.uid,
      };

      // Send POST request to your API
      createPost(post).then(() => router.push('/posts/myPosts'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentPost.title} onChange={handleChange} />

          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={currentPost.imageUrl}
            onChange={handleChange}
            required
          />
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="content"
            value={currentPost.content}
            onChange={handleChange}
            required
          />

          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="categoryId"
            name="categoryId"
            onChange={handleChange}
            value={currentPost.categoryId}
          >
            <option value="">Select a Category</option>
            {
                  categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.label}
                    </option>
                  ))
                }
          </Form.Select>

        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    categoryId: PropTypes.object,
    publicationDate: PropTypes.string,

  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
