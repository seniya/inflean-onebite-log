import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// type CreateMode = {
//   isOpen: true;
//   type: "CREATE";
// };

// type EditMode = {
//   isOpen: true;
//   type: "EDIT";
//   postId: number;
//   content: string;
//   imageUrls: string[] | null;
// };

// type OpenState = CreateMode | EditMode;

// type CloseState = {
//   isOpen: false;
// };

// type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
};

const useProfileEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    {
      name: "profileEditorModalStore",
    },
  ),
);

export const useOpenProfileEditorModal = () => {
  const open = useProfileEditorModalStore((store) => store.actions.open);
  return open;
};

export const useProfileEditorModal = () => {
  const store = useProfileEditorModalStore();
  return store;
};
