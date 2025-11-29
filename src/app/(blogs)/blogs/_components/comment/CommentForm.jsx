"use client";

import Button from "@/ui/Button";
import TextArea from "@/ui/TextArea";
import { createComment } from "@/lib/actions";
import { useActionState, useEffect, useRef, useState } from "react";
import SubmitButton from "@/ui/SubmitButton";
import toast from "react-hot-toast";

const initialState = {
  message: "",
  error: "",
};

const CommentForm = ({ postId, parentId, onClose }) => {
  const [text, setText] = useState("");
  const [state, formAction] = useActionState(createComment, initialState);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose()
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);
  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md w-full">
          <form
            className="space-y-7"
            action={async (formData) => {
              await formAction({ formData, postId, parentId });
            }}
            // action={createComment.bind(null, postId, parentId)}
          >
            <TextArea
              name="text"
              label="متن نظر"
              value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />
            <SubmitButton>تایید</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CommentForm;
