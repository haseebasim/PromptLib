"use client";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (params.id)
      (async () => {
        const response = await fetch(`/api/users/${params.id}/posts`);
        const { posts: data, user } = await response.json();
        setUser(user);
        setPosts(data);
      })();
  }, [params.id]);

  return (
    <Profile
      name={user.username}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default UserProfile;
