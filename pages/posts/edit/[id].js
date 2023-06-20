/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../../utils/data/postsData';
import PostForm from '../../../components/posts/PostForm';

export default function EditEventPage() {
  const router = useRouter();
  const { id } = router.query;

  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSinglePost(id).then((obj) => {
      obj.imageUrl = obj.image_url;
      obj.categoryId = obj.category_id;
      obj.publicationDate = obj.publication_date;
      setEditItem(obj);
    });
  }, [id]);
  console.warn(editItem);
  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <div>
        <PostForm obj={editItem} />
      </div>

    </>
  );
}
