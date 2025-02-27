import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import LogoUpload from "../../Create-Company/components/LogoUpload";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileToCloudinary } from "../../../utils/uploadFileToCloudinary";
import { COMPANY_LOGO_FOLDER } from "../../../utils/contants";
import toast from "react-hot-toast";
import API from "../../../api";
import { loadCompany } from "../../../app/slices/company";

function EditCompanyModal({ isOpen, onOpenChange, onclose }) {
  const currentCompany = useSelector((state) => state.company.data);

  const [company, setCompany] = useState({
    name: currentCompany.name,
    headline: currentCompany.headline,
    description: currentCompany.description,
    email: currentCompany.email,
    website: currentCompany.website,
    phone: currentCompany.phone,
    industry: currentCompany.industry,
    size: currentCompany.size,
    foundedIn: currentCompany.foundedIn,
  });
  const [logoImage, setLogoImage] = useState();

  const dispatch = useDispatch();

  // Handling Input Changes
  const handleInputChange = (e) => {
    setCompany((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (!logoImage) {
      return;
    }

    toast.promise(
      async () => {
        const logoUrl = await uploadFileToCloudinary(
          logoImage,
          COMPANY_LOGO_FOLDER
        );
        const response = await API.put(`/api/company/${currentCompany._id}`, {
          logo: logoUrl,
        });
        console.log(response.data);
        dispatch(loadCompany(response.data.data));
      },
      {
        loading: "Logo is Updating",
        success: "Logo Updated Successfully",
        error: "Failed to Update Logo",
      }
    );
  }, [logoImage]);

  //Handling submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    toast.promise(
      async () => {
        const response = await API.put(
          `/api/company/${currentCompany._id}`,
          company
        );
        console.log(response.data);
        dispatch(loadCompany(response.data.data));
        onclose();
      },
      {
        loading: "Company is Updating",
        success: "Company Updated Successfully",
        error: "Failed to Update Company",
      }
    );
  };

  return (
    <>
      <Modal
        isDismissable={false}
        scrollBehavior="inside"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-black border-[0.5px] border-color"
      >
        <ModalContent>
          {(onclose) => (
            <>
              <ModalHeader>Edit Company</ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={submitHandler}
                  validationBehavior="native"
                  className="mt-12 flex flex-col items-start gap-6"
                >
                  <Input
                    required
                    label="Company Name"
                    labelPlacement="outside"
                    placeholder="Enter Company Name..."
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    value={company.name}
                  />
                  <Input
                    required
                    label="Headline"
                    labelPlacement="outside"
                    placeholder="Enter Headline..."
                    name="headline"
                    type="text"
                    maxLength={100}
                    onChange={handleInputChange}
                    value={company.headline}
                  />
                  <Textarea
                    required
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Write About Your Company (Maximum 1000 characters allowed)"
                    name="description"
                    maxRows={20}
                    maxLength={1000}
                    onChange={handleInputChange}
                    value={company.description}
                  />
                  <Input
                    required
                    label="Email"
                    labelPlacement="outside"
                    placeholder="Enter Company Email..."
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={company.email}
                  />
                  <Input
                    required
                    label="Website"
                    labelPlacement="outside"
                    placeholder="Enter Company Website URL..."
                    name="website"
                    type="url"
                    onChange={handleInputChange}
                    value={company.website}
                  />
                  <Input
                    required
                    label="Contact Number"
                    labelPlacement="outside"
                    placeholder="Enter Company Contact Number..."
                    name="phone"
                    type="string"
                    onChange={handleInputChange}
                    value={company.phone}
                  />
                  <Input
                    required
                    label="Industry"
                    labelPlacement="outside"
                    placeholder="Enter Industry..."
                    name="industry"
                    type="string"
                    onChange={handleInputChange}
                    value={company.industry}
                  />

                  <div className="flex flex-col gap-1">
                    <span className="text-sm">Size</span>
                    <select
                      required
                      name="size"
                      className="px-8 py-2 rounded-xl outline-none dark:bg-[#3F3F46]"
                      defaultValue={company.size}
                      value={company.size}
                      onChange={handleInputChange}
                    >
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-200</option>
                      <option>201-500</option>
                      <option>501-1000</option>
                      <option>1000+</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm">Founded In</span>
                    <select
                      required
                      name="foundedIn"
                      className="px-8 py-2 rounded-xl outline-none dark:bg-[#3F3F46]"
                      defaultValue={company.foundedIn}
                      onChange={handleInputChange}
                      value={company.foundedIn}
                    >
                      {Array.from(
                        { length: new Date().getFullYear() - 1900 + 1 },
                        (_, i) => 1900 + i
                      ).map((year, i) => (
                        <option key={i}>{year}</option>
                      ))}
                    </select>
                    {/* For Uploading image file for logo */}
                    <div className="mt-6">
                      <span className="text-sm">Change Logo (Image)</span>
                      <LogoUpload setLogoImage={setLogoImage} />
                    </div>
                    <Button
                      type="submit"
                      radius="full"
                      className="mt-6 bg-[var(--main-color)] text-black"
                    >
                      Save Details
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditCompanyModal;
