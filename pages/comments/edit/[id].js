/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleComment } from '../../../utils/data/commentData';
import CommentForm from '../../../components/comment/CommentForm';

export default function EditCommentPage() {
  const router = useRouter();
  const { id } = router.query;

  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSingleComment(id).then((obj) => {
      setEditItem(obj);
    });
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit Comment</title>
      </Head>
      <div>
        <CommentForm obj={editItem} />
      </div>

    </>
  );
}
