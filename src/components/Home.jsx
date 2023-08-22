
import { useState, useEffect } from "react";
import useItem from "../hooks/useItem";
import GetData from "./GetData";
import Sidebar from "./Sidebar";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx"
import api from "../api";
import BGImage from "../assets/bg.png"
import InfiniteScroll from "react-infinite-scroll-component";


const Home = () => {

  const { state, dispatch, fetchMoreData } = useItem()


  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search action using the searchQuery value
  };
  return (
    <>
      <InfiniteScroll
        dataLength={state.items.length}
        next={fetchMoreData}
        hasMore={state.hasmore} // You can set this to a condition based on your data
        loader={<div className="flex items-center justify-center bg-cover bg-center gap-2 h-[calc(100vh-62px)] bg-sky-900">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>}

      >
        <div className="flex flex-col md:flex-row">
          {/* <Sidebar /> */}
          <div className="flex  flex-col w-full bg-cover bg-center gap-2 h-[calc(100vh-62px)] bg-sky-900">
            <div className="flex justify-end pt-4 mr-4 md:mr-8">
              <div className="hidden"></div>
              <form
                onSubmit={handleSearchSubmit}
                className="w-3/5 sm:w-2/5 flex relative"
              >
                <input
                  type="text"
                  value={state.searchQuery}
                  onChange={(e) => dispatch({ type: "SET_QUERY", payload: e.target.value })}
                  className="w-full px-4 py-2 text-white outline-none bg-transparent border-b border-white"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  disabled={!state.searchQuery}
                  onClick={() => dispatch({ type: "SET_QUERY", payload: "" })}
                  className={`${!state.searchQuery && "text-gray-300"
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

            <div className="px-4 md:px-8 pb-4 flex-grow overflow-y-auto max-h-80vh">

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
      </InfiniteScroll>
    </>
  )
};

export default Home;
