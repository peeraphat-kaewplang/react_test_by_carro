import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api, { API_URL } from "../http/api";
import { apiUrlQuestion } from "../http/apiUrl";
import axios from "axios";
import { useState } from "react";

type InputsQuestion = {
  Question: string;
};

const HomePage = () => {
  const [success, setSuccess] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsQuestion>();

  const submitMessage = async ({ Question }: InputsQuestion) => {
    try {
      const api = axios.create({
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const res = await api.post(apiUrlQuestion, {
        Question,
      });

      if (res.status === 200) {
        setSuccess("send mail success!");
      }
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<InputsQuestion> = (data) => submitMessage(data);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {success && <span className=" text-green-600">{success}</span>}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Question
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message
                </label>
                <textarea
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  {...register("Question", { required: true })}
                ></textarea>
                {errors.Question && (
                  <span className=" text-red-600">This field is required</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
