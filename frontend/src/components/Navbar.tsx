import { useEffect } from "react";

import { useStateContext } from "../contexts/ContextProvider";

// import { UserProfile } from ".";

import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineSupervisorAccount } from "react-icons/md";


function NavBar() {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize, currentColor } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize && screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const NavButton = ({ onClick, icon, color, dotColor }: { 
      onClick: () => void; 
      icon: JSX.Element; 
      color: string; 
      dotColor?: string; 
  }) => (
      <button
          type="button"
          onClick={onClick}
          style={{ color }}
          className="relative text-xl rounded-full p-3"
      >
          {dotColor && (
              <span
                  style={{ background: dotColor }}
                  className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
              />
          )}
          {icon}
      </button>
  );

  return (
    <div className="flex justify-between p-2 mt-2 md:mr-6 relaive">
      <div className="flex items-center">
        <NavButton
          onClick={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <p className="ml-2">
          <span className="text-gray-700 text-2xl font-poppins">Hi,</span>{" "}
          <span className="text-gray-700 font-bold ml-1 text-2xl font-poppins">
            Welcome
          </span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-hover_bg rounded-lg"
          // onClick={() => handleClick("userProfile")}
        >
          <div className="text-xl rounded-[20%] p-2 bg-cyan-100 text-sky-500">
            <MdOutlineSupervisorAccount />
          </div>
        </div>
        {/* {isClicked.userProfile && <UserProfile />} */}

      </div>
    </div>
  );
}

export default NavBar;
