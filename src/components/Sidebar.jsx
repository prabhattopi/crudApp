import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [sidebarHeight, setSidebarHeight] = useState("calc(100vh - 62px)");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic here
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Perform dropdown option logic here
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarHeight("calc(100vh - 62px)");
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
      className="flex flex-col w-full sm:w-64 bg-gray-200"
      style={{ height: sidebarHeight }}
    >
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">All</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <div className="flex flex-col space-y-4">
          {/* Hidden on small and medium screens */}
          <div className="hidden md:block bg-white p-4 rounded shadow">
            <h3>Div 1</h3>
            {/* Content for Div 1 */}
          </div>
          <div className="hidden md:block bg-white p-4 rounded shadow">
            <h3>Div 2</h3>
            {/* Content for Div 2 */}
          </div>
          <div className="hidden md:block bg-white p-4 rounded shadow">
            <h3>Div 3</h3>
            {/* Content for Div 3 */}
          </div>
          <div className="hidden md:block bg-white p-4 rounded shadow">
            <h3>Div 4</h3>
            {/* Content for Div 4 */}
          </div>
          <div className="hidden md:block bg-white p-4 rounded shadow">
            <h3>Div 5</h3>
            {/* Content for Div 5 */}
          </div>
          <div className="hidden md:block bg-white p-4 rounded shadow">
            <h3>Div 5</h3>
            {/* Content for Div 5 */}
          </div>
          {/* Add more div elements as needed */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
