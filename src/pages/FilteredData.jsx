import React, { useState } from "react";
import img from "../assets/ministry_finance.png";

export default function FilteredData() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const SearchType = [
    {
      id: 1,
      text: "All",
    },
    {
      id: 2,
      text: "direct Tax Laws",
    },
    {
      id: 3,
      text: "Competition Laws",
    },
    {
      id: 4,
      text: "Indirect Tax",
    },
    {
      id: 5,
      text: "International Tax",
    },
    {
      id: 6,
      text: "Accounts and Audits",
    },
    {
      id: 7,
      text: "Indian Acts & Rules",
    },
  ];

  return (
    <div className="p-10 md:w-[calc(100%-300px)] w-full flex flex-col items-center">
      {/* Search */}
      <div className="hidden md:flex justify-center gap-2 w-full">
        <div className="relative flex border w-full">
          <div className="relative inline-block">
            <select
              name
              id
              className="h-[40px] px-4 outline-none tracking-wide rounded-l-md border-r-2 pr-8 appearance-none caret-transparent"
            >
              {SearchType.map((item, index) => {
                return (
                  <option value classname key={index}>
                    {item.text}
                  </option>
                );
              })}
            </select>
            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              {/* Custom caret icon */}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>

          <input
            type="text"
            className="h-[40px] w-full bg-white outline-none pl-4 tracking-wider rounded-r-md"
            placeholder="Search Here ..."
          />
          <div className="absolute right-4 top-1.5">
            <i className="fa fa-search text-lg text-[grey]"></i>
          </div>
        </div>
        <div className="">
          <button className="bg-[#0085ff] w-[120px] h-[40px] tracking-wide text-[white] rounded-sm font-base outline-none">
            Search
          </button>
        </div>
      </div>
      {/* Paginated Data */}
      <div className="lg:w-[800px] w-[300px] md:mt-12 mt-0 flex items-center flex-col">
        {Array.from({ length: 10 }, (_, i) => {
          return (
            <div
              className="flex md:flex-row flex-col justify-between gap-6 w-full mt-8 cursor-pointer shadow-md inset-1 border px-6 py-6 bg-white"
              key={i}
            >
              <div className="md:w-[200px] w-full">
                <img
                  src={img}
                  className="md:h-[120px] h-[150px] w-full rounded-md"
                  alt=""
                />
              </div>
              <div className="">
                <p className="text-[13px] text-[#4b4b4b] font-medium">
                  30 Nov 2024
                </p>
                <h4 className="text-lg tracking-wide text-black font-semibold">
                  Ministry Of Finance Notifies Territorial Jurisdictions For
                  GSTAT State Benches
                </h4>
                <p className="text-sm text-[#4b4b4b] font-medium">
                  <i className="fa fa-eye"></i>
                  <span className="ml-2">
                    {Number.parseInt(Math.random() * 100)}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
        {/* Paginated Series */}

        <div className="mt-10 flex md:flex-row flex-col md:justify-between gap-4 items-center w-full">
          <div className="">
            <p className="text-[#4b4b4b]">Show Entries 1 to 10</p>
          </div>
          <div className="flex item-center gap-x-1">
            <button className="bg-[#0085ff] text-white h-[40px] w-[40px] rounded-md">
              <i className="fa fa-chevron-left"></i>
            </button>
            {Array.from({ length: 3 }, (_, i) => {
              return (
                <span className="h-[40px] w-[40px] flex justify-center items-center hover:bg-[#0085ff] hover:text-white rounded-md cursor-pointer">
                  {i + 1}
                </span>
              );
            })}
            <button className="bg-[#0085ff] text-white h-[40px] w-[40px] rounded-md">
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
