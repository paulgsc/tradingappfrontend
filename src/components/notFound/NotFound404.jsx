import React from "react";
import { Link } from "react-router-dom";
import { notFound } from "../../assets";

function NotFound404() {
  return (
    <div>
      <div className="h-screen w-screen bg-gray-100 flex items-center">
        <div className="w-full  flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.{" "}
            </p>
            <p className="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <Link to={"/"}>
              <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
                back to homepage
              </button>
            </Link>
          </div>
          <div className=" max-w-lg shadow-sm rounded-md ">
            <img className=" bg-cover" src={notFound} />
            <a href="https://www.freepik.com/free-vector/404-error-with-landscape-concept-illustration_20602802.htm#page=2&query=404&position=35&from_view=keyword&track=sph">
              Image by storyset
            </a>{" "}
            on Freepik
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound404;
