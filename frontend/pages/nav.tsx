import Link from "next/link";
interface Props {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Nav: React.FC<Props> = (props) => {
  function handleTabChange(tabName: string) {
    props.setActiveTab(tabName);
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-1 font-bold text-white mr-6">
        <Link href="/" passHref>
          QUIZZ!
        </Link>
      </div>
      <div className="flex items-center justify-center position-right">
        <div className="flex items-center justify-center">
          <button>
            <div
              className={`inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0${
                props.activeTab === "SignIn"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              } cursor-pointer`}
              onClick={() => handleTabChange("SignIn")}
              style={{ paddingLeft: "12px", margin: "0 6px 0 0" }}
            >
              Sign In
            </div>
          </button>
          <button>
            <div
              className={`inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0  ${
                props.activeTab === "SignUp"
                  ? "bg-gray-800 text-white"
                  : "text-blue-500"
              } cursor-pointer`}
              onClick={() => handleTabChange("SignUp")}
              style={{ paddingLeft: "12px", margin: "0 5px 0 0" }}
            >
              Sign Up
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
