import { useState, useEffect } from "react";
const Sidebar = () => {
  const [sidebarHeight, setSidebarHeight] = useState("calc(100vh -62px)")



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarHeight("calc(100vh - 62px)")
      } else {
        setSidebarHeight("auto");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
    className="hidden md:flex px-2 overflow-y-auto flex flex-col pt-4 w-full sm:w-64 2xl:w-1/4 2xl:px-10 2xl:py-10 bg-sky-900 overflow-hidden"
    style={{ height: sidebarHeight }}
  >
        <div className="flex flex-col space-y-4 font-bold">
          {/* Hidden on small and medium screens */}
          <div className="hidden md:block p-3 bg-yellow-500 rounded shadow">
            <h3>Software Developer</h3>
            {/* Content for Div 1 */}
          </div>
          <div className="hidden md:block bg-white p-3 rounded shadow">
            <h3>Front-End Developer</h3>
            {/* Content for Div 2 */}
          </div>
          <div className="hidden md:block bg-white p-3 rounded shadow">
            <h3>Backend Developer</h3>
            {/* Content for Div 3 */}
          </div>
          <div className="hidden md:block bg-white p-3 rounded shadow">
            <h3>Mern Developer</h3>
            {/* Content for Div 4 */}
          </div>
          <div className="hidden md:block bg-white p-3 rounded shadow">
            <h3>Android Developer</h3>
            {/* Content for Div 5 */}
          </div>
          <div className="hidden md:block bg-white p-3 rounded shadow">
            <h3>Android Developer</h3>
            {/* Content for Div 5 */}
          </div>
          <div className="hidden md:block bg-white p-3 rounded shadow">
            <h3>Android Developer</h3>
            {/* Content for Div 5 */}
          </div>
          <div className="hidden md:block bg-white p-3 rounded shadow">
            <h3>Android Developer</h3>
            {/* Content for Div 5 */}
          </div>
          <div className="hidden md:block bg-white p-3 rounded shadow">
            <h3>Qa Enginner</h3>
            {/* Content for Div 5 */}
          </div>
          {/* Add more div elements as needed */}
    
      </div>
    </div>
  );
};

export default Sidebar;
