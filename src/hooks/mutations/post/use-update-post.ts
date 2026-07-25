import { updatePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { type Post, type UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 1. 캐시 아예 초기화
      queryClient.setQueryData<Post>(
        QUERY_KEYS.post.byId(updatedPost.id),
        (prevPost) => {
          if (!prevPost)
            throw new Error(
              `${updatedPost.id}에 해당하는 포스트를 캐시 데이터에서 찾을 수 없습니다.`,
            );
          return { ...prevPost, ...updatedPost };
        },
      );

      // 2. 캐시 데이터에 완성된 포스트만 추가

      // 3. 낙관적 업데이트 방식(onMutate)
    },
    onError: (error) => {
      console.error(error);
      // window.alert(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
