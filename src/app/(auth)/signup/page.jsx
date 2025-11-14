"use client";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import SpinnerMini from "@/ui/SpinnerMini";
// export const metadata = {
//   title: "ثبت نام",
// };

const schema = yup
  .object({
    name: yup
      .string()
      .min(5)
      .max(30, "نام و نام خانواودگی نامعتبر است")
      .required("نام ونام خانوادگی الزامی است"),
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required();
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const { signup } = useAuth();
  const onSubmit = async (values) => {
    await signup(values);
  };
  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">
        ثبت نام
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField
          name="name"
          label="نام و نام خانوادگی"
          register={register}
          isRequired
          errors={errors}
        />
        <RHFTextField
          name="email"
          label="ایمیل"
          dir="ltr"
          register={register}
          isRequired
          errors={errors}
        />
        <RHFTextField
          name="password"
          label="رمز عبور"
          dir="ltr"
          type="password"
          register={register}
          isRequired
          errors={errors}
        />
        {isLoading ? (
          <SpinnerMini />
        ) : (
          <Button type="submit" variant="primary" className="w-full">
            تایید
          </Button>
        )}
      </form>
      <Link href={"/signin"} className="text-secondary-500 mt-6 text-center">
        ورود
      </Link>
    </div>
  );
}

export default Signup;
