import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"
import useAuth from '../hooks/useAuth';
import {AiOutlineSearch} from "react-icons/ai";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { logout, user } = useAuth()


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Perform search action using the searchQuery value
        console.log("Search query:", searchQuery);
    };
    const handleLogout = () => {
        logout()
    }
    return (
        <nav className="bg-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between" style={{ height: "62px" }}>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img src={Logo} alt="Logo" width="150px" style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                to="/"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>
                            {
                                user.role !== "guest" ? <Link
                                    to="/post"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Create
                                </Link> : <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Membership ⭐</Link>
                            }
                            <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>
                                Logout

                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-35 w-full bg-gray-800 z-50">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Home
                        </Link>
                        {
                            user.role !== "guest" ? <Link
                                to="/post"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Create
                            </Link> : <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Membership ⭐</Link>
                        }
                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-end bg-gray-700 py-2 px-2">
                <div className="hidden"></div>
                <form onSubmit={handleSearchSubmit} className="w-full sm:w-2/5 flex relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        placeholder="Search..."
                    />
                    <button type="submit" disabled={!searchQuery} className={`${!searchQuery&&"text-gray-300"} absolute right-2 top-1 ml-2 px-4 py-2 text-black rounded-md`}>
                    <AiOutlineSearch size={20} className="" />                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
