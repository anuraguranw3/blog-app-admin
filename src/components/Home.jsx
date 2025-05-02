import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/posts");
      setPosts(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching posts ", err);
      setError("Failed to load posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (loading) return <Loading />;
  if (error) return <h3 className="text-lg font-semibold">{error}</h3>
  if (posts.length == 0) return <div className="flex items-center justify-center gap-4 flex-col">
    <Link className="text-lg font-semibold" to="/create-post">Create post</Link>
    <h3 className="text-lg font-semibold">No posts available</h3>
  </div>

  return (
    <div className="w-full flex flex-col items-center p-5">
      <Link className="text-lg font-semibold underline pb-5" to="/create-post">Create post</Link>
      <h2 className="text-2xl font-bold mb-5">Posts</h2>
      <div className="w-full h-auto flex justify-center">
        <ul className="w-[80%] bg-white rounded-md p-3 flex flex-col gap-2">
          {
            posts.map((post) =>
              <li
                className="w-full h-40 border-2 border-gray-400 rounded-md text-black p-2 overflow-hidden relative"
                key={post.id}
              >
                <h3
                  className="text-lg font-bold"
                >{post.title}{" "}
                  <span
                    className="text-sm text-black/40 font-semibold"
                  >{new Date(post.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Kolkata",
                  })}
                  </span></h3>
                <p
                  className="text-sm font-semibold text-red-500"
                >by {post.author.username}</p>
                <h4>{post.message}</h4>
                <Link
                  className="absolute bottom-2 left-2 bg-black text-white font-semibold py-1 px-2 z-10 rounded-md"
                  to={`/posts/${post.id}`}>View post</Link>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              </li>
            ).reverse()
          }
        </ul>
      </div>
    </div>
  );
};

export default Home;