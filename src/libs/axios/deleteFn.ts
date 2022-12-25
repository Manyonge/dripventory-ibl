import Axios from "axios";

export default async (url: string) => {
  try {
    const { data } = await Axios.delete(url);
    return data;
  } catch (err) {
    throw "could not get this resource";
  }
};
