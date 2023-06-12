import React, { useState } from "react";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic here
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Perform dropdown option logic here
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full sm:w-64 bg-gray-200">
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
          <div className="bg-white p-4 rounded shadow">
            <h3>Div 1</h3>
            {/* Content for Div 1 */}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3>Div 2</h3>
            {/* Content for Div 2 */}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3>Div 3</h3>
            {/* Content for Div 3 */}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3>Div 4</h3>
            {/* Content for Div 4 */}
          </div>
          <div className="bg-white p-4 rounded shadow">
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
