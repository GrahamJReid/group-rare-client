/* eslint-disable no-param-reassign */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '../../../utils/data/userData';
import RegisterForm from '../../../components/RegisterForm';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [editUser, setEditUser] = useState({});

  useEffect(() => {
    getSingleUser(id).then((obj) => {
      setEditUser(obj);
    });
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit User</title>
      </Head>
      <div>
        <RegisterForm obj={editUser} />
      </div>

    </>
  );
}
