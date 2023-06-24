import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleUser } from '../../../utils/data/userData';
import RegisterForm from '../../../components/RegisterForm';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  
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
