import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleLogo from "../public/google-logo.jpg";
import Image from "next/image";

interface SignupFormValues {
  first_name: string;
  last_name: string;
  email: string;
  display_name: string;
  password: string;
}

const SignupSchema = yup.object().shape({
  first_name: yup.string().required(""),
  last_name: yup.string().required(""),
  email: yup.string().email("").required(""),
  display_name: yup.string().required(""),
  password: yup.string().required("").min(6, "Too short"),
});

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await fetch("http://localhost:2000/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: data.first_name,
          last_name: data.last_name,
          display_name: data.display_name,
          email: data.email,
          password: data.password,
        }),
      });
      if (response.ok) {
        // Redirect to dashboard
        window.location.href = "/";
      } else {
        // Handle error
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      // Handle network error
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-300 p-8 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 bg-gray-300  rounded-lg gap-2"
        // style={{ padding: "10px" }}
      >
        <div className="">
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-1"
            >
              First Name
            </label>
            <div className="">
              <input
                {...register("first_name")}
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                className={`${
                  errors.first_name ? "border-red-500" : ""
                } appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {errors.first_name && (
                <p>
                  <span className="text-red-500 text-sm">
                    {errors.first_name.message}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <label
              htmlFor="Last_name"
              className="block text-gray-700 font-bold mb-1"
            >
              Last Name
            </label>
            <div className="">
              <input
                {...register("last_name")}
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="given-name"
                className={`${
                  errors.last_name ? "border-red-500" : ""
                } appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              <br></br>
              {errors.last_name && (
                <span className="text-red-500 text-sm">
                  {errors.last_name.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <label
              htmlFor="dispaly_name"
              className="block text-gray-700 font-bold mb-1"
            >
              Display Name
            </label>
            <div className="">
              <input
                {...register("display_name")}
                id="display_name"
                name="display_name"
                type="text"
                autoComplete="given-name"
                className={`${
                  errors.display_name ? "border-red-500" : ""
                } appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              <br></br>
              {errors.display_name && (
                <span className="text-red-500 text-sm">
                  {errors.display_name.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-1"
            >
              Email
            </label>
            <div className="">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="text"
                autoComplete="given-name"
                className={`${
                  errors.email ? "border-red-500" : ""
                } appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              <br></br>
              {errors.email && <span className="text-red-500 text-sm">{}</span>}
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-1"
            >
              Password
            </label>
            <div className="">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="text"
                autoComplete="given-name"
                className={`${
                  errors.password ? "border-red-500" : ""
                } appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              <br></br>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            style={{ marginTop: "25px", marginLeft: "10px" }}
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="grid items-center mt-2 justify-center">
        <div>
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-800">
            -------------------------or SignUp with-------------------------
          </span>
          <br></br>
        </div>
        <div className="grid items-center justify-center mt-1">
          <hr className="flex-grow border-gray-300" />
          <button className="flex items-center justify-center ml-15 bg-white border border-gray-300 rounded-md px-4 py-2">
            <Image
              src={GoogleLogo}
              alt="Google logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
