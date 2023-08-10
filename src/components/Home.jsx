
import { useState, useEffect} from "react";
import useItem from "../hooks/useItem";
import GetData from "./GetData";
import Sidebar from "./Sidebar";
import {AiOutlineSearch} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx"
import api from "../api";


const Home = () => {

    const {state,dispatch}=useItem()
   

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Perform search action using the searchQuery value
    };
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* <Sidebar /> */}
        <div className="flex flex-col w-full  gap-2 bg-sky-800 h-[calc(100vh-62px)]">
          <div className="flex justify-end pt-4 mr-4">
            <div className="hidden"></div>
            <form
              onSubmit={handleSearchSubmit}
              className="w-4/5 sm:w-2/5 flex relative"
            >
              <input
                type="text"
                value={state.searchQuery}
                onChange={(e)=>dispatch({type:"SET_QUERY",payload:e.target.value})}
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                placeholder="Search..."
              />
              <button
                type="submit"
                disabled={!state.searchQuery}
                onClick={() =>dispatch({type:"SET_QUERY",payload:""})}
                className={`${
                  !state.searchQuery && "text-gray-300"
                } absolute right-2 top-1 ml-2 px-4 py-2 text-black rounded-md`}
              >
                {!state.searchQuery ? (
                  <AiOutlineSearch size={20} className="" />
                ) : (
                  <RxCross2 size={20} />
                )}
              </button>
            </form>
          </div>

          <div className="px-4 pb-4 flex-grow overflow-y-auto max-h-80vh">
            {state.items.length > 0 ? (
              <GetData />
            ) : (
              <div className="flex flex-col justify-center items-center h-full text-white text-3xl sm:text-1xl">
                <h3 className="mb-4 text-center">
                  Please refresh the page after 30s 🙏
                </h3>
                <p className="text-center">Or there's no Data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;
