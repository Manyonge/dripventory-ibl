import Axios from "axios";

export default async (url: string, dto: any) => {
  const { data } = await Axios.post(url, dto);
  return data;
};
