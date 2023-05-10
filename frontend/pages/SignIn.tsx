import { useState } from "react";
import Image from "next/image";
import GoogleLogo from "../public/google-logo.jpg";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:2000/api/v1/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      console.log(response);
      if (response.ok) {
        // Redirect to dashboard
        console.log(response);
        window.location.href = "/";
      } else {
        // Handle error
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      // Handle network error
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-300 p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="bg-gray-300 p-1 rounded-lg">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your Username"
            value={username}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign in
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <div className="grid items-center justify-center">
        <div>
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-800">
            -------------------------or SignIn with-------------------------
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
}

export default SignIn;
