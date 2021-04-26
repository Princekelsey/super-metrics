import React, { createContext, useState, useContext, useEffect } from "react";
import {
  SelectedUser,
  StateI,
  UsersPostI,
  DefaultStateI,
} from "../types/index";
import Server from "../api/Server";
import { compare, composeUserPosts, filterUsersName } from "../utils";
import { useHistory } from "react-router";

interface ContextI extends StateI {
  handleLogin: (name: string, email: string) => Promise<void>;
  handleStateUpdate: <T>(value: T, name: stateNames) => void;
  getPosts: (page: number) => Promise<void>;
  handleSearch: (value: string, type: "SENDER" | "POST") => void;
  setDefault: (value: React.SetStateAction<DefaultStateI>) => void;
  handleSort: (sortDirection: "desc" | "asce") => void;
  defaultState: DefaultStateI;
}

const initialContextState: ContextI = {
  isLoading: false,
  errorMessage: "",
  sl_token: "",
  posts: [],
  selectedUser: null,
  usersPosts: null,
  defaultState: { selectedUser: null, usersPosts: null },
  handleLogin: async () => {},
  handleStateUpdate: () => {},
  getPosts: async () => {},
  handleSearch: () => {},
  setDefault: () => {},
  handleSort: () => {},
};

const initialState: StateI = {
  isLoading: false,
  sl_token: "",
  posts: [],
  usersPosts: null,
  selectedUser: null,
  errorMessage: "",
};

type stateNames =
  | "isLoading"
  | "sl_token"
  | "posts"
  | "usersPosts"
  | "selectedUser";

const StateContext = createContext<ContextI>(initialContextState);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<StateI>(initialState);
  const [defaultState, setDefault] = useState<DefaultStateI>({
    usersPosts: null,
    selectedUser: null,
  });

  const { push } = useHistory();

  useEffect(() => {
    const { usersPosts, selectedUser } = state;
    if (usersPosts) {
      if (selectedUser) {
        const posts = usersPosts[selectedUser.posts[0].from_name];
        if (posts) {
          const newSelection: SelectedUser = {
            from_id: posts[0].from_id,
            posts,
          };

          setState({ ...state, selectedUser: newSelection });
        }
      } else {
        setState({ ...state, selectedUser: null });
      }
    }
    // eslint-disable-next-line
  }, [state.usersPosts]);

  const handleLogin = async (name: string, email: string): Promise<void> => {
    setState({ ...state, isLoading: true, errorMessage: "" });
    try {
      const {
        data: { data },
      } = await Server.registerUser(email, name);

      setState({
        ...state,
        isLoading: false,
        sl_token: data.sl_token,
      });
    } catch (error) {
      if (error.response?.data?.error?.message) {
        setState({
          ...state,
          errorMessage: error.response?.data?.error?.message,
          isLoading: false,
        });
      } else {
        setState({
          ...state,
          errorMessage: "Error performing operation. Please try again!!",
          isLoading: false,
        });
      }
    }
  };

  const handleStateUpdate = <T,>(value: T, name: stateNames): void => {
    setState({ ...state, [name]: value });
  };

  const getPosts = async (page: number): Promise<void> => {
    setState({ ...state, isLoading: true, errorMessage: "" });
    try {
      const {
        data: { data },
      } = await Server.getPosts(state.sl_token, page);
      const usersPosts = composeUserPosts(data.posts);
      setState({
        ...state,
        isLoading: false,
        posts: data.posts,
        usersPosts,
      });
      setDefault({ ...defaultState, usersPosts });
    } catch (error) {
      if (error.response?.data?.error?.message) {
        if (error.response?.data?.error?.message === "Invalid SL Token") {
          setState({
            ...state,
            errorMessage: "",
            isLoading: false,
            sl_token: "",
          });
          push("/");
        } else {
          setState({
            ...state,
            errorMessage: error.response?.data?.error?.message,
            isLoading: false,
          });
        }
      } else {
        setState({
          ...state,
          errorMessage: "Error performing operation. Please try again!!",
          isLoading: false,
        });
      }
    }
  };

  const handleSearch = (value: string, type: "SENDER" | "POST"): void => {
    if (type === "SENDER") {
      const toFilter = JSON.parse(
        JSON.stringify(defaultState.usersPosts)
      ) as UsersPostI;
      if (value) {
        const filtered = filterUsersName(toFilter, ([key, _]) =>
          key.toLowerCase().includes(value.toLowerCase())
        );
        setState({ ...state, usersPosts: filtered, selectedUser: null });
      } else {
        setState({
          ...state,
          usersPosts: defaultState.usersPosts,
          selectedUser: null,
        });
      }
    } else {
      const from_id = JSON.parse(
        JSON.stringify(defaultState.selectedUser?.from_id)
      ) as string;
      const toFilter = [...defaultState.selectedUser?.posts!];

      if (value) {
        const filtered = toFilter.filter((post) =>
          post.message.toLowerCase().includes(value.toLowerCase())
        );
        const selected: SelectedUser = {
          from_id,
          posts: filtered,
        };
        setState({ ...state, selectedUser: selected });
      } else {
        setState({ ...state, selectedUser: defaultState.selectedUser });
      }
    }
  };

  const handleSort = (sortDirection: "desc" | "asce") => {
    const toSort = [...state.selectedUser?.posts!];
    const sorted = toSort.sort((a, b) => compare(a, b, sortDirection));
    setState({
      ...state,
      selectedUser: { ...state.selectedUser!, posts: sorted },
    });
  };

  return (
    <StateContext.Provider
      value={{
        ...state,
        handleStateUpdate,
        getPosts,
        handleSearch,
        setDefault,
        defaultState,
        handleLogin,
        handleSort,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => useContext(StateContext);
