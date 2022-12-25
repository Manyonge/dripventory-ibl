import Axios from "axios";

export default async (url: string, dto: any) => {
  try {
    const { data } = await Axios.patch(url, dto);
    return data;
  } catch (err) {
    throw "could not get this resource";
  }
};
