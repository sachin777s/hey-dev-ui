import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  increateCurrentPage,
  changeLoading,
  resetJobs,
} from "../../../app/slices/jobs";
import API from "../../../api";

const SearchJobs = () => {
  const { hasMore, currentPage, isLoading } = useSelector(
    (state) => state.jobs
  );

  const [jobInputValue, setJobInputValue] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");

  const [selectedLocations, setselectedLocations] = useState(
    new Set(["Location Type"])
  );
  const [selectedLevels, setselectedLevels] = useState(new Set(["Level"]));

  const dispatch = useDispatch();

  //For location type dropdown menu
  const selectedLocationValue = useMemo(
    () => Array.from(selectedLocations).join(", ").replaceAll("_", " "),
    [selectedLocations]
  );

  //For level (fresher,experienced) type menu
  const selectedLevelValue = useMemo(
    () => Array.from(selectedLevels).join(", ").replaceAll("_", " "),
    [selectedLevels]
  );
  //For reset all filters
  const handleResetButtonPress = () => {
    setselectedLevels(new Set(["Level"]));
    setselectedLocations(new Set(["Location Type"]));
    setLocationInputValue("");
    setJobInputValue("");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        dispatch(increateCurrentPage());
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle Apply Filter
  const handeAppyFilter = async () => {
    dispatch(resetJobs());
    dispatch(changeLoading(true));
    const response = await API.get(
      `/api/job?page=${currentPage}&limit=9&role=${jobInputValue}&experience=${selectedLevelValue[0]}&locationType=${selectedLocationValue}`
    );
    console.log(response.data);
    dispatch(fetchJobs(response.data.data));
    dispatch(changeLoading(false));
  };

  // Adding filter
  useEffect(() => {
    console.log(selectedLocationValue + "    " + selectedLevelValue);
    handeAppyFilter();
  }, [selectedLevelValue, selectedLocationValue]);

  // Fetching jobs based on infinite scrolling
  useEffect(() => {
    if (!hasMore || isLoading) {
      return;
    }

    const fetchJobsFromServer = async () => {
      dispatch(changeLoading(true));
      const response = await API.get(`/api/job?page=${currentPage}&limit=9`);
      console.log(response.data);
      dispatch(fetchJobs(response.data.data));
      dispatch(changeLoading(false));
    };
    fetchJobsFromServer();
  }, [currentPage]);

  return (
    <div>
      {/* Search Section */}
      <div className="mt-4 px-2 sm:px-4 pb-4 flex flex-col md:flex-row items-center justify-center gap-2 border-b-[0.5px] border-color">
        <div className=" flex gap-2 flex-col md:flex-row">
          <input
            className="px-4 py-2 rounded-full outline-none border-[0.5px] border-color"
            value={jobInputValue}
            onChange={(e) => setJobInputValue(e.target.value)}
            type="text"
            placeholder="Job Title.."
          />
          <input
            className="px-4 py-2 rounded-full outline-none border-[0.5px] border-color"
            value={locationInputValue}
            onChange={(e) => setLocationInputValue(e.target.value)}
            type="text"
            placeholder="Location..."
          />
        </div>
        <Button
          variant="flat"
          radius="full"
          className="bg-[var(--main-color)] text-black"
          onClick={handeAppyFilter}
        >
          Search
        </Button>
      </div>

      {/* Filter Section */}
      <div className="mt-4 px-2 md:px-4 flex items-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" radius="full" className="capitalize">
              {selectedLocationValue}
              <RiArrowDropDownLine size={28} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Location Type"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedLocations}
            onSelectionChange={setselectedLocations}
            onChange={handeAppyFilter}
          >
            <DropdownItem key="Office">Office</DropdownItem>
            <DropdownItem key="Remote">Remote</DropdownItem>
            <DropdownItem key="Hybrid">Hybrid</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown onChange={handeAppyFilter}>
          <DropdownTrigger>
            <Button variant="bordered" radius="full" className="capitalize">
              {selectedLevelValue}
              <RiArrowDropDownLine size={28} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Levels Type"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedLevels}
            onSelectionChange={setselectedLevels}
          >
            <DropdownItem key="1 Year or Less">1 Year or Less</DropdownItem>
            <DropdownItem key="2 Year">2 Year</DropdownItem>
            <DropdownItem key="3 Year">3 Year</DropdownItem>
            <DropdownItem key="4 Year">4 Year</DropdownItem>
            <DropdownItem key="5 Year">5 Year</DropdownItem>
            <DropdownItem key="6 Year or above">6 Year or Above</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button
          radius="full"
          variant="bordered"
          onPress={handleResetButtonPress}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SearchJobs;
