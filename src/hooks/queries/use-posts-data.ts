import { fetchPost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function usePostsData() {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async () => {
      try {
        const posts = await fetchPost();
        return posts;
      } catch (error) {
        console.log("error");
        throw error;
      }
    },
  });
}
