import React from "react";
import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import SearchBar from "./PostPages/Searchbar";
import Fuse from "fuse.js";
import "./PostPages/postcss.css";

const Posts = ({ isAuth, handleShowPosts, handleEditPost }) => {
  const [postLists, setPostLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const postCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    setLoading(true);
    const data = await getDocs(postCollectionRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // Initialize the fuse instance
    const fuseInstance = new Fuse(posts, {
      keys: ["title", "postContent", "skills"],
      includeScore: true,
      threshold: 0.3,
      shouldSort: true,
      findAllMatches: true,
      distance: 1000,
    });

    setFuse(fuseInstance);
    setPostLists(posts);
    setFilteredPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this post?");
    if (shouldDelete) {
      const deleteDocRef = doc(db, "posts", id);
      await deleteDoc(deleteDocRef);
      getPosts();
    }
  };

  const toggleExpand = (id) => {
    setExpandedPosts((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((postId) => postId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const isPostExpanded = (id) => {
    return expandedPosts.includes(id);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (!fuse) {
      return;
    }

    if (searchTerm === "") {
      setFilteredPosts(postLists);
    } else {
      const results = fuse.search(searchTerm).map((result) => result.item);
      setFilteredPosts(results);
    }
  };
  const handleSelect = (displayName) => {
    setSelectedAuthor(displayName);
  };
  useEffect(() => {
    if (selectedAuthor) {
      // Open a chat window with the selected author
      openChatWindow(selectedAuthor);
    }
  }, [selectedAuthor]);

  const openChatWindow = (author) => {

    console.log(`Opening chat window with ${author}`);
    if (typeof handleShowPosts === "function") {
      handleShowPosts();
    }
  };

  const handleEdit = (post) => {
    console.log(post);
    setSelectedPost(post);
    setShowCreate(true);
    if (typeof handleEditPost === "function") {
      handleEditPost(post); // Hide the Posts component when editing
    }
  };


  if (loading) {
    return <h3>LOADING...</h3>;
  }
  return (
    <>

      <div className="homepage">
        <div className="homepage-design">
          <p className="homepage-caption">Start Collaborating TODAY!</p>
          <div className="search-bar col-lg-6 offset-lg-3">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div className="homepage-posts-container">
          {filteredPosts.length === 0 ? (
            <h3>No post found.</h3>
          ) : (
            filteredPosts.map((post) => {
              const content = isPostExpanded(post.id)
                ? post.postContent
                : post.postContent.slice(0, 300);
              const shouldShowButton = post.postContent.length > 300;

              return (
                <div key={post.id} className="card mb-4 ml-10 mr-10 border-0 shadow color:">
                  <div className="card-body">
                    {isAuth &&
                      auth.currentUser &&
                      post.author.id === auth.currentUser.uid && (

                        <>
                          <button
                            className="edit-button"
                            onClick={() => {
                              handleEdit(post); // Pass the post data to edit
                            }}
                          >
                            Edit Post
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => {
                              deletePost(post.id);
                            }}
                          >
                            Delete Post
                          </button>
                        </>

                      )}

                    <h5 className="card-title mb-3 fw-bold">{post.title} </h5>
                    <p className="card-text mb-3">
                      <strong>Description:</strong> {content}
                      {shouldShowButton && (
                        <button
                          className="readmore-btn"
                          onClick={() => toggleExpand(post.id)}
                        >
                          {isPostExpanded(post.id)
                            ? "Read less"
                            : "...Read more"}
                        </button>
                      )}
                    </p>
                    {post.skills && (
                      <div className="skills-container">
                        <h6><strong>Skills Required:</strong> {post.skills}</h6>
                      </div>
                    )}
                    <span className="created-by">
                      Created By:
                    </span>

                    {post.author.name && (
                      <span
                        className="badge rounded-pill"
                        onClick={() => handleSelect(post.author.name)}
                        style={{ cursor: "pointer" }}
                      >
                        {post.author.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {showCreate && (
        <CreatePost
          onPostSuccess={() => {
            setShowCreate(false);
            setSelectedPost(null); // Reset the selected post after successful edit or new post
          }}
          selectedPost={selectedPost} // Pass the selected post data to CreatePost
        />
      )}
    </>
  );
};

export default Posts;