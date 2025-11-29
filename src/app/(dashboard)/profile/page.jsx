import { fetchCardData } from "@/services/data";
import Card from "./_components/Card";
import PostsTable from "./posts/_/components/PostsTable";

async function Profile() {
  const { numberOfPost, numberOfComments, numberOfUsers } =
    await fetchCardData();
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card title="کاربران"  value={numberOfUsers} type="users" />
        <Card title="پست ها" value={numberOfPost} type="posts" />
        <Card title="نظرات" value={numberOfComments} type="comments" />
      </div>
      <PostsTable query="sort=latest&limit=5"  />
    </div>
  );
}

export default Profile;
