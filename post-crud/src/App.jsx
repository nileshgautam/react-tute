/*

HTTP Request.

- state managemnet
- loading and error handling
- crud function (create, read, update, delete)
- Child components

Post List
post Form 
SearchBar
PostItem

 */

import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  // State for storing post data
  const [posts, setPosts] = useState([]);

  // Sate for loading behaviour
  const [loading, setLoading] = useState(false);

  //sate for error handling
  const [error, setError] = useState(null);

  //State for search term
  const [searchTerm, setSearchTerm] = useState('');

  const [showForm, setShowForm] = useState(false);

  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    userId: 1
  });
  // Sate for Form submission
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Function to create new post function
  const createPost = async (postData) => {

    try {
      // Set submitting state to show loading the data.
      setShowForm(true);

      setSubmitting(true);

      // Clear any previouss errors
      setError(null);

      //Make post request to create new post.
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          "Content-type": 'application/json'
        },
        body: JSON.stringify(postData)
      });

      //C
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdPost = await response.json();

      //Add new post to the begining of our post array
      setPosts(prevPost => [createdPost, ...prevPost]);
      // Reset the form
      setNewPost({
        title: '',
        body: '',
        userId: 1
      });
      setShowForm(false);

    } catch (error) {
      setError(`Faild to create Post:${error}`);
      console.error(`Error while creating post:`, error);
    } finally {

      setSubmitting(false);

    }

  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Form Validation
    if (!newPost.title.trim() || !newPost.body.trim()) {
      setError('Please fill both title and body');
      return;
    }
    // Set previouse Error null
    setError(null);

    // call new post function
    if (isEditing) {
      updatePost(editingId, newPost);
    } else {
      createPost(newPost);
    }


  }

  // useEffect to fetch all post data
  useEffect(() => { fetchPost() }, []);

  // Fetch all post list from API

  const fetchPost = async () => {
    try {
      //Set loading true to start load data
      setLoading(true);


      //Clear any previouse Errors

      setError(null);

      // make API call

      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // convert response to JSON

      const data = await response.json();

      // now Set post data;

      setPosts(data);


    } catch (error) {

      setError(error.message);
      console.log('Error Fetching posts:', error);

    } finally {
      setLoading(false);
    }
  };

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setNewPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const deletePost = async (postId) => {
    try {
      setError(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
    } catch (error) {
      setError(`Failed to delete post: ${error.message}`);
      console.error("Error deleting post:", error);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updated = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...updated, id } : post
        )
      );

      setNewPost({
        title: "",
        body: "",
        userId: 1,
      });

      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      setError(`Failed to update post: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post) => {
    setNewPost({
      title: post.title,
      body: post.body,
      userId: post.userId,
    });

    setEditingId(post.id);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="App">

      <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-md my-6 flex flex-col items-center justify-center text-white">
        <h1>Posts Manager</h1>
        <p>Mange your blog posts with full crud operations</p>
      </header>


      <div className="flex justify-center my-6">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Post'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit}>

          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditing ? "Edit Post" : "Create New Post"}
            </h3>

            {/* Title */}
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Post Title
              </label>

              <input
                type="text"
                id="title"
                value={newPost.title}
                name="title"
                onChange={(e) =>
                  handleInputChange("title", e.target.value)
                }
                placeholder="Enter an engaging title..."
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Body */}
            <div className="mb-6">
              <label
                htmlFor="body"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Post Content
              </label>

              <textarea
                name="body"
                id="body"
                value={newPost.body}
                onChange={(e) =>
                  handleInputChange("body", e.target.value)
                }
                placeholder="Write your post content..."
                rows="6"
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={
                  submitting ||
                  !newPost.title.trim() ||
                  !newPost.body.trim()
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-lg"
              >
                {submitting
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                    ? "Update Post"
                    : "Create Post"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={submitting}
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow hover:bg-gray-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {loading && (
        <div className="flex flex-col item-center justify-center text-center bg-blue-200 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-blue-600">Loading posts...</h2>
          <p className="text-gray-600 mt-2">Please wait while we fetch data</p>
        </div>
      )}

      {error && (

        <div className="error flex flex-col items-center justify-center text-center bg-red-200 p-5 rounded-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            Error Occurred!
          </h2>

          <p className="text-red-500 text-lg mb-6">
            {error}
          </p>

          <button
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            onClick={fetchPost}
          >
            Try Again
          </button>
        </div>

      )}

      {!loading && !error && (

        <div className="posts-container">
          <h2 className="font-bold mb-2">All Posts({posts.length})</h2>

          {posts.length === 0 ? (
            <p>No Posts Found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {post.body}
                  </p>

                  <small className="text-gray-500 block mb-4">
                    Post Id: {post.id} | User Id: {post.userId}
                  </small>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      )}

    </div>
  );
}


export default App;