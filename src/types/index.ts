export type inputTypes =
  | "textarea"
  | "text"
  | "email"
  | "tel"
  | "password"
  | "number"
  | "search"
  | "color"
  | "date"
  | "time"
  | "datetime-local";

export type formStatus = "success" | "error" | "warning" | "info";

export interface FormStateI {
  email: string;
  name: string;
}

export interface PostI {
  id: string;
  from_name: string;
  from_id: string;
  message: string;
  type: string;
  created_time: string;
}

export interface UsersPostI {
  [key: string]: PostI[];
}

export interface SelectedUser {
  from_id: string;
  posts: PostI[];
}

export interface StateI {
  sl_token: string;
  isLoading: boolean;
  errorMessage: string;
  posts: PostI[];
  usersPosts: UsersPostI | null;
  selectedUser: SelectedUser | null;
}

export interface DefaultStateI {
  usersPosts: UsersPostI | null;
  selectedUser: SelectedUser | null;
}
