import http from "./httpService";

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/list`);
const {
  data: { categories },
} = await res.json();

export async function getCategoriesApi(options) {
  return http.get("/category/list", options).then(({ data }) => data.data);
}
