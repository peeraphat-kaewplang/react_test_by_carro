import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../http/api";
import { apiUrlregister } from "../http/apiUrl";
import { useState } from "react";
import { login } from "../lib/login";

type InputsRegister = {
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
};

const RegisterPage = () => {
  const history = useNavigate();
  const [errormsg, setErrormsg] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsRegister>();

  const registerUser = async ({ email, password, age }: InputsRegister) => {
    try {
      const res = await api.post(apiUrlregister, {
        email,
        password,
        age,
      });

      let userLogin = {
        email , 
        password
      }

      const log = await login(userLogin);

      if(log) {
        history('/');
      }
      
    } catch (error: any) {
      setErrormsg(error.response.data);
    }
  };

  const onSubmit: SubmitHandler<InputsRegister> = (data) => registerUser(data);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {errormsg && <span className=" text-red-600">{errormsg}</span>}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className=" text-red-600">This field is required</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", {
                    required: true,
                    validate: (val: string) => {
                      if (val.length < 6) {
                        return "Please enter at least 6 characters!";
                      }
                    },
                  })}
                />
                {errors.password && (
                  <span className=" text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }

                      if (watch("password").length < 6) {
                        return "Please enter at least 6 characters!";
                      }
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className=" text-red-600">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="number"
                  name="Age"
                  id="Age"
                  placeholder="Age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <Link to="/login">
                <button
                  type="button"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
