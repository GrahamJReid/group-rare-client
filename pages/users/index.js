import React, { useEffect, useState } from 'react';
import { getUsers } from '../../utils/data/userData';
import UserCard from '../../components/UserCard';

function Home() {
  const [users, setUsers] = useState([]);

  const displayUser = () => {
    getUsers().then((data) => setUsers(data));
  };
  useEffect(() => {
    displayUser();
  }, []);

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
            <UserCard
              first_name={user.first_name}
              last_name={user.last_name}
              profile_image_url={user.profile_image_url}
              created_on={user.created_on}
              email={user.email}
              onUpdate={displayUser}
            />
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;
