import React, { useCallback, useEffect, useRef, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FilteredPage() {
  const [searchType, setSearchType] = useState(true); // true for global and false for specific
  // State for options and selected values
  const [options, setOptions] = useState([
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
    { name: "Option 3", id: 3 },
    { name: "Option 4", id: 4 },
    { name: "Option 5", id: 5 },
    { name: "Option 6", id: 6 },
    { name: "Option 7", id: 7 },
    { name: "Option 8", id: 8 },
    { name: "Option 9", id: 9 },
    { name: "Option 10", id: 10 },
    { name: "Option 11", id: 11 },
    { name: "Option 12", id: 12 },
    { name: "Option 14", id: 14 },
  ]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [formData, setFormData] = useState({
    g_courts: [],
    g_publishers: [],
    s_courts: [],
    s_publishers: [],
    s_departments: [],
    s_ministries: [],
    s_states: [],
    s_formTypes: [],
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [activeDpd, setActiveDpd] = useState("");
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDpd(""); // Close the dropdown
      }
    };

    // Add event listener on component mount
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handler for selection
  const onSelect = useCallback((selectedList, selectedItem) => {
    setSelectedValues(selectedList);
    console.log("Selected Item:", selectedItem);
  }, []);

  // Handler for removal
  const onRemove = useCallback((selectedList, removedItem) => {
    setSelectedValues(selectedList);
    console.log("Removed Item:", removedItem);
  }, []);

  const docType = [
    {
      id: 1,
      label: "Judgement",
      value: "Judgement",
    },
    {
      id: 2,
      label: "Notification",
      value: "Notification",
    },
    {
      id: 3,
      label: "Judgements",
      value: "Judgements",
    },
    {
      id: 4,
      label: "Circular",
      value: "Circular",
    },
    {
      id: 5,
      label: "Circular Act",
      value: "Circular Act",
    },
    {
      id: 6,
      label: "Template Forms",
      value: "Template Forms",
    },
  ];

  console.log("Selected Values", formData);

  return (
    <div className="md:p-10 p-7">
      <div className="flex justify-between tracking-wide w-[300px]">
        {/* Filtered Parameters */}
        <div className=" w-full">
          {/* Choose Global/Specific Search */}
          <div className="rounded-sm">
            <button
              className={`${
                searchType
                  ? "bg-[#0085ff] text-white"
                  : "text-[#0085ff] border border-[#0085ff]"
              }  w-[50%] h-[38px] text-sm font-medium rounded-l-sm`}
              onClick={() => {
                setSearchType(!searchType);
              }}
            >
              Global Search
            </button>
            <button
              className={`${
                !searchType
                  ? "bg-[#0085ff] text-white"
                  : "text-[#0085ff] border border-[#0085ff]"
              }  w-[50%] h-[38px] text-sm font-medium rounded-l-sm`}
              onClick={() => {
                setSearchType(!searchType);
              }}
            >
              Specific Search
            </button>
          </div>

          {!searchType ? (
            <div className="">
              {/* <Multiselect
                options={options} // Options to display in the dropdown
                placeholder="Select an option" // Set a placeholder
                selectedValues={selectedValues} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                showCheckbox={true}
              /> */}
              {/* Date filter */}
              <div className="mt-6">
                {/* <label htmlFor="date_range" className="font-medium text-[13px]">
                  Date Filter
                </label> */}
                {/* <input
                  type="date"
                  id="date_range"
                  className="w-full h-[38px] outline-none border border-[grey] rounded-sm px-2"
                /> */}
                <DatePicker
                  selected={startDate}
                  onChange={(update) => {
                    setStartDate(update[0]);
                    setEndDate(update[1]);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  // isClearable
                  className="border p-2 w-[300px] cursor-pointer outline-none"
                />
              </div>
              {/* Search Type */}
              <div className="mt-3">
                <label
                  htmlFor="search_type"
                  className="font-medium text-[13px]"
                >
                  Search Type
                </label>
                <input
                  type="text"
                  id="search_type"
                  className="w-full h-[38px] outline-none border border-[grey] rounded-sm px-2"
                  placeholder="Search Type"
                />
              </div>
              {/* Document Type */}
              <div className="mt-3">
                <label htmlFor="doc_type" className="font-medium text-[13px]">
                  Document Type
                </label>
                {docType.map((type) => {
                  return (
                    <div className="">
                      <input
                        type="checkbox"
                        id={type.label}
                        className="h-[16px] w-[16px] outline-none relative top-0.5"
                      />
                      <label htmlFor={type.label} className=" text-[14px] ml-2">
                        {type.label}
                      </label>
                    </div>
                  );
                })}
              </div>

              {/* Form Type */}
              <div className="mt-3">
                <label htmlFor="form_type" className="font-medium text-[13px]">
                  Select Form Type
                </label>
                <div className="relative mt-1">
                  <div
                    className="resize-none w-full outline-none min-h-[40px] bg-white border border-black rounded-sm flex items-center gap-2 flex-wrap px-2 text-sm py-2 cursor-pointer"
                    onClick={() => {
                      if (activeDpd === "s_formType") {
                        setActiveDpd("");
                        return;
                      }
                      setActiveDpd("s_formType");
                    }}
                  >
                    {formData?.s_formTypes?.map((opt, i) => {
                      return (
                        <button
                          className="bg-[#0085ff] text-white p-1 px-3 rounded-full cursor-pointer text-xs hover:bg-[#f85437]"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            const filteredValues = formData?.s_formTypes.filter(
                              (option) => option !== opt
                            );
                            setFormData((prevData) => {
                              return {
                                ...prevData,
                                s_formTypes: filteredValues,
                              };
                            });
                          }}
                          title="Remove"
                        >
                          {opt}
                          <button className="ml-2">
                            <i className="fa fa-close"></i>
                          </button>
                        </button>
                      );
                    })}
                    <span className="text-[grey]">Select Form Types</span>
                  </div>
                  {activeDpd === "s_formType" ? (
                    <i className="fa fa-angle-down absolute right-3 top-3"></i>
                  ) : (
                    <i className="fa fa-angle-right absolute right-3 top-3"></i>
                  )}
                  {activeDpd === "s_formType" && (
                    <div
                      className="dropdown absolute bg-white w-full z-10 shadow-md max-h-72 overflow-y-auto"
                      // ref={dropdownRef}
                    >
                      {options.filter(
                        (opt) => !formData.s_formTypes.includes(opt.name)
                      ).length !== 0 ? (
                        options
                          .filter(
                            (opt) => !formData.s_formTypes.includes(opt.name)
                          )
                          .map((opt, i) => {
                            return (
                              <div
                                className="cursor-pointer h-[34px] flex items-center pl-4 pr-2 hover:bg-[#0085ff] hover:text-white"
                                onClick={() => {
                                  // setSelectedValues([
                                  //   ...selectedValues,
                                  //   opt.name,
                                  // ]);
                                  setFormData((prevData) => {
                                    return {
                                      ...prevData,
                                      s_formTypes: [
                                        ...prevData.s_formTypes,
                                        opt.name,
                                      ],
                                    };
                                  });
                                }}
                              >
                                {opt.name}
                              </div>
                            );
                          })
                      ) : (
                        <div className="cursor-pointer h-[40px] flex items-center justify-center w-full text-gray-800">
                          No more left ...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Courts */}
              <div className="mt-3">
                <label htmlFor="form_type" className="font-medium text-[13px]">
                  Select Courts
                </label>
                <div className="relative mt-1">
                  <div
                    className="resize-none w-full outline-none min-h-[40px] bg-white border border-black rounded-sm flex items-center gap-2 flex-wrap px-2 text-sm py-2 cursor-pointer"
                    onClick={() => {
                      if (activeDpd === "s_court") {
                        setActiveDpd("");
                        return;
                      }
                      setActiveDpd("s_court");
                    }}
                  >
                    {formData.s_courts.map((opt, i) => {
                      return (
                        <button
                          className="bg-[#0085ff] text-white p-1 px-3 rounded-full cursor-pointer text-xs hover:bg-[#f85437]"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            const filteredValues = formData.s_courts.filter(
                              (option) => option !== opt
                            );
                            setFormData((prevData) => {
                              return {
                                ...prevData,
                                s_courts: filteredValues,
                              };
                            });
                          }}
                          title="Remove"
                        >
                          {opt}
                          <button className="ml-2">
                            <i className="fa fa-close"></i>
                          </button>
                        </button>
                      );
                    })}
                    <span className="text-[grey]">Select Courts</span>
                  </div>
                  {activeDpd === "s_court" ? (
                    <i className="fa fa-angle-down absolute right-3 top-3"></i>
                  ) : (
                    <i className="fa fa-angle-right absolute right-3 top-3"></i>
                  )}
                  {activeDpd === "s_court" && (
                    <div
                      className="dropdown absolute bg-white w-full z-10 shadow-md max-h-72 overflow-y-auto"
                      // ref={dropdownRef}
                    >
                      {options.filter(
                        (opt) => !formData.s_courts.includes(opt.name)
                      ).length !== 0 ? (
                        options
                          .filter(
                            (opt) => !formData.s_courts.includes(opt.name)
                          )
                          .map((opt, i) => {
                            return (
                              <div
                                className="cursor-pointer h-[34px] flex items-center pl-4 pr-2 hover:bg-[#0085ff] hover:text-white"
                                onClick={() => {
                                  // setSelectedValues([
                                  //   ...selectedValues,
                                  //   opt.name,
                                  // ]);
                                  setFormData((prevData) => {
                                    return {
                                      ...prevData,
                                      s_courts: [
                                        ...prevData.s_courts,
                                        opt.name,
                                      ],
                                    };
                                  });
                                }}
                              >
                                {opt.name}
                              </div>
                            );
                          })
                      ) : (
                        <div className="cursor-pointer h-[40px] flex items-center justify-center w-full text-gray-800">
                          No more left ...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Ministries */}
              <div className="mt-3">
                <label htmlFor="form_type" className="font-medium text-[13px]">
                  Select Ministries
                </label>
                <div className="relative mt-1">
                  <div
                    className="resize-none w-full outline-none min-h-[40px] bg-white border border-black rounded-sm flex items-center gap-2 flex-wrap px-2 text-sm py-2 cursor-pointer"
                    onClick={() => {
                      if (activeDpd === "s_ministry") {
                        setActiveDpd("");
                        return;
                      }
                      setActiveDpd("s_ministry");
                    }}
                  >
                    {formData.s_ministries.map((opt, i) => {
                      return (
                        <button
                          className="bg-[#0085ff] text-white p-1 px-3 rounded-full cursor-pointer text-xs hover:bg-[#f85437]"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            const filteredValues = formData.s_ministries.filter(
                              (option) => option !== opt
                            );
                            setFormData((prevData) => {
                              return {
                                ...prevData,
                                s_ministries: filteredValues,
                              };
                            });
                          }}
                          title="Remove"
                        >
                          {opt}
                          <button className="ml-2">
                            <i className="fa fa-close"></i>
                          </button>
                        </button>
                      );
                    })}
                    <span className="text-[grey]">Select Ministries</span>
                  </div>
                  {activeDpd === "s_ministry" ? (
                    <i className="fa fa-angle-down absolute right-3 top-3"></i>
                  ) : (
                    <i className="fa fa-angle-right absolute right-3 top-3"></i>
                  )}
                  {activeDpd === "s_ministry" && (
                    <div
                      className="dropdown absolute bg-white w-full z-10 shadow-md max-h-72 overflow-y-auto"
                      // ref={dropdownRef}
                    >
                      {options.filter(
                        (opt) => !formData.s_ministries.includes(opt.name)
                      ).length !== 0 ? (
                        options
                          .filter(
                            (opt) => !formData.s_ministries.includes(opt.name)
                          )
                          .map((opt, i) => {
                            return (
                              <div
                                className="cursor-pointer h-[34px] flex items-center pl-4 pr-2 hover:bg-[#0085ff] hover:text-white"
                                onClick={() => {
                                  // setSelectedValues([
                                  //   ...selectedValues,
                                  //   opt.name,
                                  // ]);
                                  setFormData((prevData) => {
                                    return {
                                      ...prevData,
                                      s_ministries: [
                                        ...prevData.s_ministries,
                                        opt.name,
                                      ],
                                    };
                                  });
                                }}
                              >
                                {opt.name}
                              </div>
                            );
                          })
                      ) : (
                        <div className="cursor-pointer h-[40px] flex items-center justify-center w-full text-gray-800">
                          No more left ...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Departments */}
              <div className="mt-3">
                <label htmlFor="form_type" className="font-medium text-[13px]">
                  Select Departments
                </label>
                <div className="relative mt-1">
                  <div
                    className="resize-none w-full outline-none min-h-[40px] bg-white border border-black rounded-sm flex items-center gap-2 flex-wrap px-2 text-sm py-2 cursor-pointer"
                    onClick={() => {
                      if (activeDpd === "s_department") {
                        setActiveDpd("");
                        return;
                      }
                      setActiveDpd("s_department");
                    }}
                  >
                    {formData.s_departments.map((opt, i) => {
                      return (
                        <button
                          className="bg-[#0085ff] text-white p-1 px-3 rounded-full cursor-pointer text-xs hover:bg-[#f85437]"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            const filteredValues =
                              formData.s_departments.filter(
                                (option) => option !== opt
                              );
                            setFormData((prevData) => {
                              return {
                                ...prevData,
                                s_departments: filteredValues,
                              };
                            });
                          }}
                          title="Remove"
                        >
                          {opt}
                          <button className="ml-2">
                            <i className="fa fa-close"></i>
                          </button>
                        </button>
                      );
                    })}
                    <span className="text-[grey]">Select Departments</span>
                  </div>
                  {activeDpd === "s_department" ? (
                    <i className="fa fa-angle-down absolute right-3 top-3"></i>
                  ) : (
                    <i className="fa fa-angle-right absolute right-3 top-3"></i>
                  )}
                  {activeDpd === "s_department" && (
                    <div
                      className="dropdown absolute bg-white w-full z-10 shadow-md max-h-72 overflow-y-auto"
                      // ref={dropdownRef}
                    >
                      {options.filter(
                        (opt) => !formData.s_departments.includes(opt.name)
                      ).length !== 0 ? (
                        options
                          .filter(
                            (opt) => !formData.s_departments.includes(opt.name)
                          )
                          .map((opt, i) => {
                            return (
                              <div
                                className="cursor-pointer h-[34px] flex items-center pl-4 pr-2 hover:bg-[#0085ff] hover:text-white"
                                onClick={() => {
                                  // setSelectedValues([
                                  //   ...selectedValues,
                                  //   opt.name,
                                  // ]);
                                  setFormData((prevData) => {
                                    return {
                                      ...prevData,
                                      s_departments: [
                                        ...prevData.s_departments,
                                        opt.name,
                                      ],
                                    };
                                  });
                                }}
                              >
                                {opt.name}
                              </div>
                            );
                          })
                      ) : (
                        <div className="cursor-pointer h-[40px] flex items-center justify-center w-full text-gray-800">
                          No more left ...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* States */}
              <div className="mt-3">
                <label htmlFor="form_type" className="font-medium text-[13px]">
                  Select States
                </label>
                <div className="relative mt-1">
                  <div
                    className="resize-none w-full outline-none min-h-[40px] bg-white border border-black rounded-sm flex items-center gap-2 flex-wrap px-2 text-sm py-2 cursor-pointer"
                    onClick={() => {
                      if (activeDpd === "s_state") {
                        setActiveDpd("");
                        return;
                      }
                      setActiveDpd("s_state");
                    }}
                  >
                    {formData.s_states.map((opt, i) => {
                      return (
                        <button
                          className="bg-[#0085ff] text-white p-1 px-3 rounded-full cursor-pointer text-xs hover:bg-[#f85437]"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            const filteredValues = formData.s_states.filter(
                              (option) => option !== opt
                            );
                            setFormData((prevData) => {
                              return {
                                ...prevData,
                                s_states: filteredValues,
                              };
                            });
                          }}
                          title="Remove"
                        >
                          {opt}
                          <button className="ml-2">
                            <i className="fa fa-close"></i>
                          </button>
                        </button>
                      );
                    })}
                    <span className="text-[grey]">Select States</span>
                  </div>
                  {activeDpd === "s_state" ? (
                    <i className="fa fa-angle-down absolute right-3 top-3"></i>
                  ) : (
                    <i className="fa fa-angle-right absolute right-3 top-3"></i>
                  )}
                  {activeDpd === "s_state" && (
                    <div
                      className="dropdown absolute bg-white w-full z-10 shadow-md max-h-72 overflow-y-auto"
                      // ref={dropdownRef}
                    >
                      {options.filter(
                        (opt) => !formData.s_states.includes(opt.name)
                      ).length !== 0 ? (
                        options
                          .filter(
                            (opt) => !formData.s_states.includes(opt.name)
                          )
                          .map((opt, i) => {
                            return (
                              <div
                                className="cursor-pointer h-[34px] flex items-center pl-4 pr-2 hover:bg-[#0085ff] hover:text-white"
                                onClick={() => {
                                  // setSelectedValues([
                                  //   ...selectedValues,
                                  //   opt.name,
                                  // ]);
                                  setFormData((prevData) => {
                                    return {
                                      ...prevData,
                                      s_states: [
                                        ...prevData.s_states,
                                        opt.name,
                                      ],
                                    };
                                  });
                                }}
                              >
                                {opt.name}
                              </div>
                            );
                          })
                      ) : (
                        <div className="cursor-pointer h-[40px] flex items-center justify-center w-full text-gray-800">
                          No more left ...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Publishers */}
              <div className="mt-3">
                <label htmlFor="form_type" className="font-medium text-[13px]">
                  Select Publishers
                </label>
                <div className="relative mt-1">
                  <div
                    className="resize-none w-full outline-none min-h-[40px] bg-white border border-black rounded-sm flex items-center gap-2 flex-wrap px-2 text-sm py-2 cursor-pointer"
                    onClick={() => {
                      if (activeDpd === "s_publisher") {
                        setActiveDpd("");
                        return;
                      }
                      setActiveDpd("s_publisher");
                    }}
                  >
                    {formData.s_publishers.map((opt, i) => {
                      return (
                        <button
                          className="bg-[#0085ff] text-white p-1 px-3 rounded-full cursor-pointer text-xs hover:bg-[#f85437]"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            const filteredValues = formData.s_publishers.filter(
                              (option) => option !== opt
                            );
                            setFormData((prevData) => {
                              return {
                                ...prevData,
                                s_publishers: filteredValues,
                              };
                            });
                          }}
                          title="Remove"
                        >
                          {opt}
                          <button className="ml-2">
                            <i className="fa fa-close"></i>
                          </button>
                        </button>
                      );
                    })}
                    <span className="text-[grey]">Select Publishers</span>
                  </div>
                  {activeDpd === "s_publisher" ? (
                    <i className="fa fa-angle-down absolute right-3 top-3"></i>
                  ) : (
                    <i className="fa fa-angle-right absolute right-3 top-3"></i>
                  )}
                  {activeDpd === "s_publisher" && (
                    <div
                      className="dropdown absolute bg-white w-full z-10 shadow-md max-h-72 overflow-y-auto"
                      // ref={dropdownRef}
                    >
                      {options.filter(
                        (opt) => !formData.s_publishers.includes(opt.name)
                      ).length !== 0 ? (
                        options
                          .filter(
                            (opt) => !formData.s_publishers.includes(opt.name)
                          )
                          .map((opt, i) => {
                            return (
                              <div
                                className="cursor-pointer h-[34px] flex items-center pl-4 pr-2 hover:bg-[#0085ff] hover:text-white"
                                onClick={() => {
                                  // setSelectedValues([
                                  //   ...selectedValues,
                                  //   opt.name,
                                  // ]);
                                  setFormData((prevData) => {
                                    return {
                                      ...prevData,
                                      s_publishers: [
                                        ...prevData.s_publishers,
                                        opt.name,
                                      ],
                                    };
                                  });
                                }}
                              >
                                {opt.name}
                              </div>
                            );
                          })
                      ) : (
                        <div className="cursor-pointer h-[40px] flex items-center justify-center w-full text-gray-800">
                          No more left ...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="flex justify-between mt-6">
                <div className="">
                  <input
                    type="number"
                    className="w-[140px] h-[40px] border border-black rounded-sm outline-none px-2"
                    placeholder="From Year"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    className="w-[140px] h-[40px] border border-black rounded-sm outline-none px-2"
                    placeholder="To Year"
                  />
                </div>
              </div>

              <div className="mt-6">
                <input
                  type="text"
                  id="search_type"
                  className="w-full h-[38px] outline-none border border-[grey] rounded-sm px-2"
                  placeholder="Volume"
                />
              </div>
            </div>
          ) : (
            <div className="">
              {/* Testing drop down */}

              {/* Date filter */}
              <div className="mt-6">
                {/* <label htmlFor="date_range" className="font-medium text-[13px]">
                  Date Filter
                </label> */}
                {/* <input
                  type="date"
                  id="date_range"
                  className="w-full h-[38px] outline-none border border-[grey] rounded-sm px-2"
                /> */}
                <DatePicker
                  selected={startDate}
                  onChange={(update) => {
                    setStartDate(update[0]);
                    setEndDate(update[1]);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  // isClearable
                  className="border p-2 w-[300px] cursor-pointer outline-none"
                />
              </div>
              {/* Search Type */}
              <div className="mt-3">
                <label
                  htmlFor="search_type"
                  className="font-medium text-[13px]"
                >
                  Search Type
                </label>
                <input
                  type="text"
                  id="search_type"
                  className="w-full h-[38px] outline-none border border-[grey] rounded-sm px-2"
                  placeholder="Search Type"
                />
              </div>
              {/* Document Type */}
              <div className="mt-3">
                <label htmlFor="doc_type" className="font-medium text-[13px]">
                  Document Type
                </label>
                {docType.map((type) => {
                  return (
                    <div className="">
                      <input
                        type="checkbox"
                        id={type.label}
                        className="h-[16px] w-[16px] outline-none relative top-0.5 cursor-pointer"
                      />
                      <label
                        htmlFor={type.label}
                        className=" text-[14px] ml-2 cursor-pointer"
                      >
                        {type.label}
                      </label>
                    </div>
                  );
                })}
              </div>

              {/* Courts */}
              <div className="mt-3">
                <label htmlFor="form_type" className="font-medium text-[13px]">
                  Select Courts
                </label>
                <div className="relative mt-1">
                  <div
                    className="resize-none w-full outline-none min-h-[40px] bg-white border border-black rounded-sm flex items-center gap-2 flex-wrap px-2 text-sm py-2 cursor-pointer"
                    onClick={() => {
                      if (activeDpd === "g_court") {
                        setActiveDpd("");
                        return;
                      }
                      setActiveDpd("g_court");
                    }}
                  >
                    {formData.g_courts.map((opt, i) => {
                      return (
                        <button
                          className="bg-[#0085ff] text-white p-1 px-3 rounded-full cursor-pointer text-xs hover:bg-[#f85437]"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            const filteredValues = formData.g_courts.filter(
                              (option) => option !== opt
                            );
                            setFormData((prevData) => {
                              return {
                                ...prevData,
                                g_courts: filteredValues,
                              };
                            });
                          }}
                          title="Remove"
                        >
                          {opt}
                          <button className="ml-2">
                            <i className="fa fa-close"></i>
                          </button>
                        </button>
                      );
                    })}
                    <span className="text-[grey]">Select Courts</span>
                  </div>
                  {activeDpd === "g_court" ? (
                    <i className="fa fa-angle-down absolute right-3 top-3"></i>
                  ) : (
                    <i className="fa fa-angle-right absolute right-3 top-3"></i>
                  )}
                  {activeDpd === "g_court" && (
                    <div
                      className="dropdown absolute bg-white w-full z-10 shadow-md max-h-72 overflow-y-auto"
                      // ref={dropdownRef}
                    >
                      {options.filter(
                        (opt) => !formData.g_courts.includes(opt.name)
                      ).length !== 0 ? (
                        options
                          .filter(
                            (opt) => !formData.g_courts.includes(opt.name)
                          )
                          .map((opt, i) => {
                            return (
                              <div
                                className="cursor-pointer h-[34px] flex items-center pl-4 pr-2 hover:bg-[#0085ff] hover:text-white"
                                onClick={() => {
                                  // setSelectedValues([
                                  //   ...selectedValues,
                                  //   opt.name,
                                  // ]);
                                  setFormData((prevData) => {
                                    return {
                                      ...prevData,
                                      g_courts: [
                                        ...prevData.g_courts,
                                        opt.name,
                                      ],
                                    };
                                  });
                                }}
                              >
                                {opt.name}
                              </div>
                            );
                          })
                      ) : (
                        <div className="cursor-pointer h-[40px] flex items-center justify-center w-full text-gray-800">
                          No more left ...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Publishers */}
              <div className="mt-3">
                <label htmlFor="form_type" className="font-medium text-[13px]">
                  Select Publishers
                </label>
                <div className="relative mt-1">
                  <div
                    className="resize-none w-full outline-none min-h-[40px] bg-white border border-black rounded-sm flex items-center gap-2 flex-wrap px-2 text-sm py-2 cursor-pointer"
                    onClick={() => {
                      if (activeDpd === "g_publisher") {
                        setActiveDpd("");
                        return;
                      }
                      setActiveDpd("g_publisher");
                    }}
                  >
                    {formData.g_publishers.map((opt, i) => {
                      return (
                        <button
                          className="bg-[#0085ff] text-white p-1 px-3 rounded-full cursor-pointer text-xs hover:bg-[#f85437]"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            const filteredValues = formData.g_publishers.filter(
                              (option) => option !== opt
                            );
                            setFormData((prevData) => {
                              return {
                                ...prevData,
                                g_publishers: filteredValues,
                              };
                            });
                          }}
                          title="Remove"
                        >
                          {opt}
                          <button className="ml-2">
                            <i className="fa fa-close"></i>
                          </button>
                        </button>
                      );
                    })}
                    <span className="text-[grey]">Select Publishers</span>
                  </div>
                  {activeDpd === "g_publisher" ? (
                    <i className="fa fa-angle-down absolute right-3 top-3"></i>
                  ) : (
                    <i className="fa fa-angle-right absolute right-3 top-3"></i>
                  )}
                  {activeDpd === "g_publisher" && (
                    <div
                      className="dropdown absolute bg-white w-full z-10 shadow-md max-h-72 overflow-y-auto"
                      // ref={dropdownRef}
                    >
                      {options.filter(
                        (opt) => !formData.g_publishers.includes(opt.name)
                      ).length !== 0 ? (
                        options
                          .filter(
                            (opt) => !formData.g_publishers.includes(opt.name)
                          )
                          .map((opt, i) => {
                            return (
                              <div
                                className="cursor-pointer h-[34px] flex items-center pl-4 pr-2 hover:bg-[#0085ff] hover:text-white"
                                onClick={() => {
                                  // setSelectedValues([
                                  //   ...selectedValues,
                                  //   opt.name,
                                  // ]);
                                  setFormData((prevData) => {
                                    return {
                                      ...prevData,
                                      g_publishers: [
                                        ...prevData.g_publishers,
                                        opt.name,
                                      ],
                                    };
                                  });
                                }}
                              >
                                {opt.name}
                              </div>
                            );
                          })
                      ) : (
                        <div className="cursor-pointer h-[40px] flex items-center justify-center w-full text-gray-800">
                          No more left ...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="flex justify-between mt-6">
                <div className="">
                  <input
                    type="number"
                    className="w-[140px] h-[40px] border border-black rounded-sm outline-none px-2"
                    placeholder="Enter Year"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    className="w-[140px] h-[40px] border border-black rounded-sm outline-none px-2"
                    placeholder="Enter Year"
                  />
                </div>
              </div>

              <div className="mt-6">
                <input
                  type="text"
                  id="search_type"
                  className="w-full h-[38px] outline-none border border-[grey] rounded-sm px-2"
                  placeholder="Volume"
                />
              </div>
            </div>
          )}
          <div className="mt-6">
            <button className="bg-[#0085ff] w-[160px] h-[36px] tracking-wide text-[white] rounded-sm font-base text-sm outline-none">
              <i className="fa fa-filter mr-2"></i>
              <span>Apply filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
