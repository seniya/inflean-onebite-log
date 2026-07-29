import { fetchComment } from "@/api/comment";

import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function useCommentsData(postId: number) {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.comment.post(postId),
    queryFn: () => fetchComment(postId),
  });
}
