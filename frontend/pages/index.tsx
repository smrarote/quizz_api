//import Image from "next/image";
//import { Inter } from "next/font/google";
import Link from "next/link";

//const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";
import Nav from "./nav";
import SignIn from "./SignIn";
import SignUp from "./signup";

export default function Home() {
  const [activeTab, setActiveTab] = useState("SignIn");

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover"
      style={{ backgroundImage: "url(/quiz_background.jpg)" }}
    >
      <div className="fixed top-0 w-full">
        <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl text-gray-800 font-bold mb-6">{activeTab}</h2>
        {/* <div className="flex mb-4">
          <div
            className={`flex-1 text-center py-2 ${
              activeTab === "signin"
                ? "bg-blue-500 text-white"
                : "text-blue-500"
            } cursor-pointer`}
            onClick={() => handleTabChange("signin")}
          >
            Sign in
          </div>
          <div
            className={`flex-1 text-center py-2 ${
              activeTab === "signup"
                ? "bg-blue-500 text-white"
                : "text-blue-500"
            } cursor-pointer`}
            onClick={() => handleTabChange("signup")}
          >
            Sign up
          </div>
        </div> */}
        {activeTab === "SignIn" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}
