/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import { getSinglePost } from '../../utils/data/postsData';
import { getPostsByCategory } from '../../utils/data/postsData';
import PostCard from '../../components/posts/PostCard';
import { getSingleCategory } from '../../utils/data/categoriesData';

function CategoryDetails() {
  const [post, setPost] = useState([]);
  // const [category, setCategory] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleCategory(id).then((data) => {
      getPostsByCategory(data.id).then((posts) => setPost(posts));

      // setCategory(data[0]);
    });
  }, [id]);
  console.warn(post);
  return (
    <>
      {/* // <h1>{category.category_id.label}</h1> */}
      {post.map((posts) => (
        <section key={`posts--${post.id}`} className="post">
          <PostCard id={posts.id} title={posts.title} imageUrl={posts.image_url} rareUserId={posts.rare_user_id} />
        </section>
      ))}
    </>
  );
}

export default CategoryDetails;
