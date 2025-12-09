import { getUser, type User } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const USER = "user";

const useUser = () => {
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  
  const { data: user, ...rest } = useQuery<User>({
    queryKey: [USER],
    queryFn: () => getUser(userId!),
  });
  return {
    user,
    ...rest,
  };
};

export default useUser;