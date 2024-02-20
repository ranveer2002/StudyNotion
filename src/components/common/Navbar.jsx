import React, { useState, useEffect } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";

// const subLinks = [
//   {
//     title:"Pyhton",
//     link:"/catalog/python"
//   },
//   {
//     title:"Web-Dev",
//     link:"/catalog/web-development"
//   },
// ]

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing Sublinks data : ", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("could not fetch the category");
    }
  };
  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 items-center justify-center border border-b-[1px] border-b-richblack-700">
      <div className="flex w-10/12 max-w-maxContent justify-between items-center">
        {/* image */}
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* navlinks */}

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index} className="">
                  {link?.title === "Catalog" ? (
                    <div className="relative flex gap-2 items-center group cursor-pointer">
                      <p>{link.title}</p>
                      <MdKeyboardArrowDown />

                      <div className="invisible absolute z-10 left-[50%] top-[50%] translate-x-[-50%] mt-5 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px]">
                        <div className="absolute left-[50%] top-0 translate-x-[80%] -translate-y-1 w-6 h-6 rotate-45  bg-richblack-5"></div>

                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              // ?.filter(
                              //   (subLink) => subLink?.course?.length > 0
                              // )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-2 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login/signup */}

        <div className="flex gap-x-4 items-center ">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative text-richblack-100">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
              {totalItems > 0 && <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-3 py-1 text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-3 py-1 text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
