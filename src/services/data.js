import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getPosts } from "./postServices";
import { getAllCommentsApi } from "./commentService";
import { getAllUsersApi } from "./authService";

export async function fetchCardData() {
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);

  try {
    const data = await Promise.all([
      getPosts(),
      getAllCommentsApi(options),
      getAllUsersApi(options),
    ]);
    const numberOfPost = Number(data[0].posts.length ?? "0");
    const numberOfComments = Number(data[1].countComments ?? "0");
    const numberOfUsers = Number(data[2].users.length ?? "0");
    return {
      numberOfPost,
      numberOfComments,
      numberOfUsers,
    };
  } catch (err) {
    console.log(err);
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}
