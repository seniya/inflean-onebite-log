import { signInWithOauth } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithOauth(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOauth,
    onError: (error) => {
      console.error(error);
      // window.alert(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
