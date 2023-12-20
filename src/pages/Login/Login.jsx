import React, { useState } from "react";
import googleImg from "../../assets/img/icons/common/google.svg";
import telegramImg from "../../assets/img/icons/common/telegram.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const [sessionToken, setSessionToken] = useState("");
  console.log(sessionToken);
  window.localStorage.setItem("token", sessionToken);
  // Login API parameters
  const email = "tanmoysom@gmail.com";
  const password = "973257o425@MFXB";
  const loginApiUrl = `https://www.myfxbook.com/api/login.json?email=${email}&password=${password}`;

  // Second API parameters
  const accountId = 10125757;
  const historyApiUrl = `https://www.myfxbook.com/api/get-history.json?session=${sessionToken}&id=${accountId}`;

  // useEffect(() => {
  //   fetchSessionToken();
  // }, []);

  const fetchSessionToken = async () => {
    try {
      const response = await fetch(loginApiUrl);
      const jsonData = await response.json();
      setSessionToken(jsonData.session);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching session token:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    axios
      .post("https://indian.munihaelectronics.com/public/api/login", formdata)
      .then((response) => {
        // window.localStorage.setItem('user-loggedIn', true)
        const user = response.data;
        console.log(user);
        setUserData(user);
        window.localStorage.setItem("userInfo", JSON.stringify(user));

        console.log(response);
        if (response.data.status === "1" && response?.data.role === "admin") {
          navigate("/");
          window.localStorage.setItem("admin-loggedIn", true);
        } else if (
          response.data.status === "1" &&
          response?.data.role === "client"
        ) {
          window.localStorage.setItem("user-loggedIn", true);
          // Successful login
          navigate("/");
          // <Navigate to={'/admin/index'} state={{ from: location }} replace />
          // loginAlert();
        } else if (response.data.status === "0") {
          console.error(error);
          setError("You account is Deactive");
        }
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Email or Password is wrong, Please Enter Correct email or password !"
        );
      });
  };
  return (
    <div className="container mx-auto mt-5  p-1">
      <form
        class="max-w-sm mx-auto shadow-2xl rounded p-5 bg-white"
        onSubmit={handleSubmit}
      >
        <div className=" text-center mt-2 mb-3">
          <small className="text-gray-400 font-semibold">Sign in with</small>
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
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>

          <input
            type="email"
            name="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter email address"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        {/* <div class="mb-5">
          <label
            for="repeat-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repeat password
          </label>
          <input
            type="password"
            id="repeat-password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div> */}
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
          onClick={fetchSessionToken}
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block mx-auto w-3/4"
        >
          Login
        </button>
        <div className=" flex justify-between items-center mt-3">
          <div xs="6">
            <a
              className="text-blue"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small className="text-indigo-500">Forgot password?</small>
            </a>
          </div>
          <div className="text-right" xs="6">
            <Link
              className="text-primary text-decoration-none"
              to={`/register`}
            >
              <small className="text-indigo-500">Create new account</small>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
