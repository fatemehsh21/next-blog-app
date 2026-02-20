import React, { Suspense } from "react";
import PostsTable from "./_/components/PostsTable";
import Spinner from "@/ui/Spinner";
import Search from "@/ui/Search";
import { CreatePost } from "./_/components/Button";
import queryString from "query-string";
import { getPosts } from "@/services/postServices";
import Pagination from "@/ui/Pagination";

async function Page({ searchParams }) {
  const query = queryString.stringify(searchParams);
  const { totalPages } = await getPosts(query);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-secondary-700 items-center mb-12">
        <h1 className="text-xl font-bold">لیست پست ها</h1>
        <Search />
        <CreatePost />
      </div>
      <Suspense fallback={<Spinner />} key={query}>
        <PostsTable query={query} />
      </Suspense>
      <div className="mt-5 w-full flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page;
