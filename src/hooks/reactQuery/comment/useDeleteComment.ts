import {
  getDocs,
  doc,
  collection,
  query,
  where,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface deleteCommentProps {
  parentId: string;
}
// 댓글 삭제 함수
const deleteComment = async ({ parentId }: deleteCommentProps) => {
  const commentsCollection = collection(db, "posts");
  const deleteData = query(
    commentsCollection,
    where("parentId", "==", parentId),
  );

  const querySnapshot = await getDocs(deleteData);
  querySnapshot.forEach(async docSnapshot => {
    const commentRef = doc(db, "posts", docSnapshot.id);
    await deleteDoc(commentRef);
  });
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation<void, Error, deleteCommentProps>(
    deleteComment,
    {
      onSuccess: () => {
        // 쿼리 무효화 시켜서 다시 조회해서 updated(삭제 처리 )
        queryClient.invalidateQueries(["deleteComments"]);
      },
    },
  );
  // 삭제 함수 및 실패시 에러 반환하는 메소드 export
  return { mutate, error };
};

export default useDeleteComment;
