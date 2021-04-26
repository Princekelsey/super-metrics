import axiosClient from "./axiosClient";
import { PostI } from "../types/index";

const client_id = "ju16a6m81mhid5ue1z3v2g0uh";

interface MetaI {
  request_id: string;
}

export interface RegisterResponseI {
  meta: MetaI;
  data: {
    client_id: string;
    email: string;
    sl_token: string;
  };
}

export interface GetPostsResponseI {
  meta: MetaI;
  data: {
    page: number;
    posts: PostI[];
  };
}

const Server = {
  registerUser: async (email: string, name: string) => {
    return await axiosClient.post<RegisterResponseI>("/register", {
      client_id,
      email,
      name,
    });
  },

  getPosts: async (sl_token: string, page: number = 1) => {
    return await axiosClient.get<GetPostsResponseI>("/posts", {
      params: { sl_token, page },
    });
  },
};

export default Server;
