"use client";
import { useEffect, useState } from 'react';
import { api } from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.fetchPosts();
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    const response = await api.createPost(newPost);
    setPosts([...posts, response.data]);
    setNewPost({ title: '', body: '' });
  };

  const handleDeletePost = async (id: number) => {
    await api.deletePost(id);
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleUpdatePost = async (id: number) => {
    const updatedPost = { ...newPost };
    const response = await api.updatePost(id, updatedPost);
    setPosts(posts.map(post => (post.id === id ? response.data : post)));
    setNewPost({ title: '', body: '' });
  };

  return (
    <div>
    <div className='bg-white text-black font-mono rounded-full text-center max-w-screen-sm m-10'>
      <h1>Posts</h1>
    </div>
    <div className='mt-2'>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        className='bg-black shadow shadow-white border border-white mx-6 my-2'
      />
      <input
        type="text"
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        className='bg-black shadow shadow-white border border-white mx-6 my-2'
      />
      <button onClick={handleCreatePost} className='bg-amber-600 rounded-xl text-white font-mono font-bold px-4'>Create Post</button>
      
      {posts.map(post => (
        <div key={post.id} className='border border-white m-8'>
          <h2 className='text-2xl'>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => handleUpdatePost(post.id)} className='m-4 rounded-full bg-green-400 text-white font-mono font-bold px-10 border border-white'>Update</button>
          <button onClick={() => handleDeletePost(post.id)} className='m-4 rounded-full bg-red-500 text-white font-mono font-bold px-10 border border-white'>Delete</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Home;
