import axios from "axios";

const nutritionApi = axios.create({
  baseURL: "/api",
});

const searchFood = async ({
  query,
  start = 0,
  count = 25,
  spell = true,
}: {
  query: string;
  start?: number;
  count?: number;
  spell?: boolean;
}) => {
  const result = await nutritionApi.get(
    `/foods?query=${query}&start=${start}&count=${count}&spell=${spell}`
  );

  return result.data;
};

const getFood = async (url: string) => {
  const result = await nutritionApi.get(`/food/${url}`);
  return result.data;
};

const getNutrients = async () => {
  const result = await nutritionApi.get("/nutrients");
  return result.data;
};

export default {
  searchFood,
  getFood,
  getNutrients,
};
