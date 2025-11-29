import CoverImage from "./CoverImage";
import { ClockIcon } from "@heroicons/react/24/outline";
import Author from "./Author";
import Link from "next/link";
import PostInteraction from "./PostInteraction";

async function PostList({posts}) {

  return posts.length > 0 ? (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post) => (
        <div
          key={post._id}
          className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-300 rounded-lg p-2"
        >
          <CoverImage {...post} />
          <div>
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="font-bold text-secondary-700 mb-4">
                {post.title}
              </h2>
            </Link>
            <div className="flex items-center justify-between mb-4">
              <Author {...post.author} />
              <div className="flex items-center text-[10px] text-secondary-500">
                <ClockIcon className="w-4 h-4 stroke-secondary-500 ml-1" />
                <span className="ml-1">خواندن: </span>
                <span className="leading-3 ml-1">{post.readingTime}</span>
                <span>دقیقه</span>
              </div>
            </div>
            <PostInteraction post={post} />
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

export default PostList;
