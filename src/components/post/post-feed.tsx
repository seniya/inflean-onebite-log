// import { usePostsData } from "@/hooks/queries/use-posts-data";
import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import PostItem from "@/components/post/post-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data";

export default function PostFeed({ authorId }: { authorId?: string }) {
  // const { data, error, isPending } = usePostsData();
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostsData(authorId);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // 데이터 추가
      fetchNextPage(); // todo: 왜 두번이나 호출되는것인가??
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((postId) => (
          <PostItem key={postId} postId={postId} type="FEED" />
        )),
      )}
      {isFetchingNextPage && <Loader />}
      {/* // {data.map((post) => (
      //   <PostItem key={post.id} {...post} />
      // ))} */}
      <div ref={ref}></div>
    </div>
  );
}
