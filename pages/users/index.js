import React, { useEffect, useState } from 'react';
import UserCard from '../../components/users/UserCard';
import { getUsers, updateUser } from '../../utils/data/userData';
import RegisterForm from '../../components/RegisterForm';

function Home() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const displayUsers = () => {
    getUsers()
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    // Fetch all users from the API
    displayUsers();
  }, []);

  const handleUpdateUser = (userId) => {
    // Call the API to update the user's information
    updateUser(userId)
      .then(() => {
        displayUsers();
        setEditingUserId(null);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  return (
    <article className="text-center my-4" id="users">
      <h1 style={{ marginTop: '40px' }}>Users</h1>

      <div className="text-center my-4 d-flex">
        {users.map((user) => (
          <section
            key={`user--${user.id}`}
            className="user"
            style={{ margin: '40px' }}
            id="user-section"
          >
            {editingUserId === user.id ? (
              <RegisterForm
                userId={user.id}
                user={user}
                updateUser={handleUpdateUser}
              />
            ) : (
              <UserCard
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                profile_image_url={user.profile_image_url}
                created_on={user.created_on}
                email={user.email}
                onUpdate={handleEditUser}
              />
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;
