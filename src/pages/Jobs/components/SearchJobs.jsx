import React, { useMemo, useState } from 'react'
import { Button } from '@nextui-org/react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/react";
import { RiArrowDropDownLine } from 'react-icons/ri';


const SearchJobs = () => {
    const [jobInputValue, setJobInputValue] = useState("");
    const [locationInputValue, setLocationInputValue] = useState("");

    const [selectedLocations, setselectedLocations] = useState(new Set(["Location Type"]));
    const [selectedLevels, setselectedLevels] = useState(new Set(["Level"]));

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

    //For Handling Jobs Search
    const handleSearchJobs = () => {

    }

    //For reset all filters
    const handleResetButtonPress = () => {
        setselectedLevels(new Set(["Level"]))
        setselectedLocations(new Set(["Location Type"]))
    }

    return (
        <div>
            {/* Search Section */}
            <div className="mt-4 px-2 sm:px-4 pb-4 flex flex-col md:flex-row items-center justify-center gap-2 border-b-[0.5px] border-color">
                <div className=" flex gap-2 flex-col md:flex-row">
                    <input
                        className='px-4 py-2 rounded-full outline-none border-[0.5px] border-color'
                        value={jobInputValue}
                        onChange={(e) => setJobInputValue(e.target.value)}
                        type="text"
                        placeholder='Job Title..'
                    />
                    <input
                        className='px-4 py-2 rounded-full outline-none border-[0.5px] border-color'
                        value={locationInputValue}
                        onChange={(e) => setLocationInputValue(e.target.value)}
                        type="text"
                        placeholder='Location...'
                    />
                </div>
                <Button
                    variant='flat'
                    radius='full'
                    className='bg-[var(--main-color)] text-black'
                    onPress={handleSearchJobs}
                >Search
                </Button>
            </div>

            {/* Filter Section */}
            <div className="mt-4 px-2 md:px-4 flex items-center gap-2">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            radius='full'
                            className="capitalize"
                        >
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
                    >
                        <DropdownItem key="office">Office</DropdownItem>
                        <DropdownItem key="remote">Remote</DropdownItem>
                        <DropdownItem key="hybrid">Hybrid</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            radius='full'
                            className="capitalize"
                        >
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
                        <DropdownItem key="fresher">Fresher</DropdownItem>
                        <DropdownItem key="1-year">1 year</DropdownItem>
                        <DropdownItem key="2-year">2 year</DropdownItem>
                        <DropdownItem key="3-year">3 year</DropdownItem>
                        <DropdownItem key="4-year">4 year</DropdownItem>
                        <DropdownItem key="5-year">5 year</DropdownItem>
                        <DropdownItem key="6-year or above">6 year or Above</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button
                    radius='full'
                    variant='bordered'
                    onPress={handleResetButtonPress}
                >
                    Reset
                </Button>
            </div>
        </div>
    )
}

export default SearchJobs