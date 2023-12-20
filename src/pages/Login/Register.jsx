import React from "react";
import googleImg from "../../assets/img/icons/common/google.svg";
import telegramImg from "../../assets/img/icons/common/telegram.svg";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className=" mt-5  p-1 ">
      <form class="max-w-sm mx-auto shadow-2xl rounded p-5 bg-white w-96">
        <div className=" text-center mt-2 mb-3">
          <small className="text-gray-400 font-semibold">Sign up with</small>
        </div>
        <div className="btn-wrapper text-center flex justify-evenly items-center">
          <button
            className="flex justify-center  items-center mr-4 shadow-lg p-2 rounded transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 w-32"
            color="default"
            href="#pablo"
            // onClick={(e) => e.preventDefault()}
          >
            <span className="btn-inner--icon">
              <img alt="..." src={telegramImg} className="w-[20px] mr-2" />
            </span>
            <span className="text-indigo-500">Telegram</span>
          </button>
          <button
            className="flex justify-center items-center mr-4 shadow-lg p-2 rounded transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 w-32"
            color="default"
            // onClick={handleGoogleSignIn}
          >
            <span className="btn-inner--icon">
              <img alt="..." src={googleImg} className="w-[20px] mr-2" />
            </span>
            <span className="text-indigo-500">Google</span>
          </button>
        </div>
        <div className="divide-y divide-dashed mt-2"></div>
        <div class="mb-5 mt-10">
          <label
         
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <i class="fa-solid fa-user text-info"></i>
          <input
            type="text"
            placeholder="Your Name"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div class="mb-5">
          <label
         
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           Email
          </label>
          <input
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@gmail.com"
            required
          />
        </div>
        
        <div class="mb-5">
          <label
            
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="****"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div class="mb-5">
          <label
            
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           Mobile No
          </label>
          <input
            type="number"
            placeholder="019"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div class="mb-5">
          <label
            
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           Referal Code
          </label>
          <input
            type="text"
            
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="terms"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              class="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block mx-auto w-3/4"
        >
          Register
        </button>
        <div className=" flex justify-between items-center mt-3">
          <div xs="6">
            <Link to="/login">
              <p className="text-gray-600">
                Already Registered ?{" "}
                <span className="text-indigo-500">Login</span>{" "}
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
