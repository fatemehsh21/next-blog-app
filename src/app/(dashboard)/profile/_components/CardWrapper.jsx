import { fetchCardData } from "@/services/data";
import Card from "./Card";

async function CardWrapper() {
  const { numberOfPost, numberOfComments, numberOfUsers } =
    await fetchCardData();
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card title="کاربران" value={numberOfUsers} type="users" />
      <Card title="پست ها" value={numberOfPost} type="posts" />
      <Card title="نظرات" value={numberOfComments} type="comments" />
    </div>
  );
}

export default CardWrapper;
