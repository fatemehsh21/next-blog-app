import React from "react";
import PostsTable from "./PostsTable";

function LatestPosts() {
  const query = "sort=latest&limit=5";
  return <PostsTable query={query} />;
}

export default LatestPosts;
