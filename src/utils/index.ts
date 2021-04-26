import { UsersPostI, PostI } from "../types/index";

type Predicate = (
  value: [string, PostI[]],
  index: number,
  array: [string, PostI[]][]
) => void;

/**
 * Composes posts according to post sender name.
 * @param posts list of all posts
 * @returns Returns an object with sender's name as key and array of posts as value
 */
export const composeUserPosts = (posts: PostI[]): UsersPostI => {
  const usersPost: UsersPostI = {};

  const sorted = posts.sort((a, b) => compare(a, b, "desc"));

  sorted.forEach((post) => {
    if (usersPost[post.from_name]) {
      usersPost[post.from_name] = [...usersPost[post.from_name], { ...post }];
    } else {
      usersPost[post.from_name] = [{ ...post }];
    }
  });

  return sortUsersName(usersPost);
};

/**
 * Sorts post sender's name alphabetically.
 * @param  usersPost object with sender's name as key and array of posts as value
 * @returns Returns an object sorted by key  alphabetically. Sender's name is key and array of posts is value
 */
const sortUsersName = (usersPost: UsersPostI): UsersPostI => {
  return Object.keys(usersPost)
    .sort()
    .reduce((result: Record<string, any>, key) => {
      result[key] = usersPost[key];
      return result;
    }, {});
};

/**
 * Fiters post sender's name.
 * @param  usersPost Object of users with their posts
 * @param  Predicate callback function with filtering logic
 * @returns  Returns an object filtered by key. Sender's name is key and array of posts is value
 */
export const filterUsersName = (
  usersPost: UsersPostI,
  predicate: Predicate
): UsersPostI =>
  Object.fromEntries(Object.entries(usersPost).filter(predicate));

/**
 * Compares posts properties for sorting.
 * @param  a first post to compare
 * @param  b second post to compare
 * @param  sortDirection order of the sort
 * @returns Returns 1 | -1 | 0
 */
export const compare = (
  a: PostI,
  b: PostI,
  sortDirection: "desc" | "asce"
): 1 | -1 | 0 => {
  if (sortDirection === "asce") {
    if (a.created_time < b.created_time) {
      return -1;
    }
    if (a.created_time > b.created_time) {
      return 1;
    }
    return 0;
  } else {
    if (a.created_time > b.created_time) {
      return -1;
    }
    if (a.created_time < b.created_time) {
      return 1;
    }
    return 0;
  }
};

/**
 * Checks if an object is empty.
 * @param  object The object to check
 * @returns Returns true or false
 */
export const isObjectEmpty = (obj: Record<string, any>): boolean => {
  for (const _ in obj) return false;

  return true;
};
