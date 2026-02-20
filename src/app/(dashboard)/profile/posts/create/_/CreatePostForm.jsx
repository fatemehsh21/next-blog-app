"use client";

import { useCategories } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useCreatePost from "./useCreatePost";
import { useRouter } from "next/navigation";
import SpinnerMini from "@/ui/SpinnerMini";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";

const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();
function CreatePostForm({ postToEdit = {} }) {
  const { _id: editId } = postToEdit;
  const isEditSession = Boolean(editId);
  const {
    title,
    text,
    slug,
    briefText,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl,
  } = postToEdit;
  let editValues = {};
  if (isEditSession) {
    editValues = {
      title,
      text,
      slug,
      briefText,
      readingTime,
      category: category._id,
      coverImage,
    };
  }
  const router = useRouter();
  const { isCreating, createPost } = useCreatePost();
  const { editPost, isEditing } = useEditPost();
  const [coverImageUrl, setCoverImageUrl] = useState(prevCoverImageUrl || null);
  const { categories } = useCategories();

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editValues,
  });

  useEffect(() => {
    if (prevCoverImageUrl) {
      async function fetchMyApi() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("coverImage", file);
      }
      fetchMyApi();
    }
  }, [editId]);

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
        },
      });
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        label="عنوان"
        register={register}
        name="title"
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="متن کوتاه"
        register={register}
        name="briefText"
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="متن"
        register={register}
        name="text"
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="اسلاگ"
        register={register}
        name="slug"
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="زمان مطالعه"
        register={register}
        name="readingTime"
        errors={errors}
        isRequired
      />
      <RHFSelect
        label="دسته بندی"
        name="category"
        register={register}
        isRequired
        options={categories}
      />
      <Controller
        control={control}
        name="coverImage"
        rules={{ required: "کاور الزامی است" }}
        render={({ field: { value, onBlur, onChange, ...rest } }) => (
          <FileInput
            {...rest}
            isRequired
            value={value?.fileName}
            name="coverImage"
            errors={errors}
            label="انتخاب کاور پست"
            onChange={(e) => {
              const file = e.target.files[0];
              onChange(file);
              setCoverImageUrl(URL.createObjectURL(file));
              e.target.value = null;
            }}
          />
        )}
      />
      {coverImageUrl && (
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            fill
            alt="cover-image"
            src={coverImageUrl}
            className="object-cover object-center"
          />
          <ButtonIcon
            onClick={() => {
              setCoverImageUrl(null);
              setValue("coverImage", null);
            }}
            variant="red"
            className="absolute w-6 h-6 left-4 top-4"
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}
      <div>
        {isCreating ? (
          <SpinnerMini />
        ) : (
          <Button variant="primary" type="submit" className="w-full">
            تایید
          </Button>
        )}
      </div>
    </form>
  );
}

export default CreatePostForm;
