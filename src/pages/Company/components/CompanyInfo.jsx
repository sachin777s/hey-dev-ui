import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";
import EditCompanyModal from "./EditCompanyModal";
import { useSelector } from "react-redux";

const CompanyInfo = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const company = useSelector((state) => state.company.data);

  return (
    <div>
      <div className="pr-2 sm:pr-4 flex flex-col items-end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="cursor-pointer">
              <BsThreeDots size={24} />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings" onPress={onOpen}>
              Edit Compnay Details
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <EditCompanyModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onclose={onClose}
      />

      <div className="mt-6 flex items-center justify-center">
        <div className="h-36 md:h-44 w-36 md:w-44 rounded-full border-2 border-[var(--main-color)] overflow-hidden">
          {company.logo ? (
            <img
              className="w-full h-full rounded-full"
              src={company.logo}
              alt="..."
            />
          ) : (
            <CgOrganisation className="h-full w-full" />
          )}
        </div>
      </div>
      <div className="flex items-center flex-col">
        <div className="mt-2 flex flex-col">
          <span className="text-2xl font-bold text-center">{company.name}</span>
          <span className="max-w-[360px] opacity-70 text-center">
            {company.headline}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
