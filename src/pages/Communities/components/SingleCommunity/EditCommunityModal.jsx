import { Form } from "@nextui-org/form";
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
import UploadLogo from "../helpers/UploadLogo";
import toast from "react-hot-toast";
import { uploadFileToCloudinary } from "../../../../utils/uploadFileToCloudinary";
import { COMMUNITY_LOGO } from "../../../../utils/contants";
import API from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunity } from "../../../../app/slices/community";

function EditCommunityModal({ isOpen, onOpenChange }) {
  const currentCommunity = useSelector((state) => state.community.data);

  const [community, setCommunity] = useState({
    name: currentCommunity.name,
    headline: currentCommunity.headline,
    description: currentCommunity.description,
  });
  const [logoImage, setLogoImage] = useState(null);
  const [rules, setRules] = useState(currentCommunity.rules);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setCommunity((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const filterRules = () => {
    setRules((prev) => prev.filter((rule) => rule !== ""));
  };

  // Updating the logo image
  useEffect(() => {
    if (!logoImage) {
      return;
    }
    const updateLogo = async () => {
      toast.promise(
        async () => {
          const logoUrl = await uploadFileToCloudinary(
            logoImage,
            COMMUNITY_LOGO
          );
          const response = await API.put(
            `/api/community/${currentCommunity._id}`,
            {
              logo: logoUrl,
            }
          );
          console.log(response);
          dispatch(fetchCommunity(response.data.data));
          setLogoImage(null);
        },
        {
          loading: "Community Logo is Updating",
          success: "Logo is Updated Successfully",
          error: "Failed to Update Logo",
        }
      );
    };
    updateLogo();
  }, [logoImage]);

  // Handling submit the form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    filterRules();
    console.log(rules);
    toast.promise(
      async () => {
        const response = await API.put(
          `/api/community/${currentCommunity._id}`,
          { ...community, rules }
        );
        dispatch(fetchCommunity(response.data.data));
      },
      {
        loading: "Community is updating",
        success: "Community is updating",
        error: "Failed to update community",
      }
    );
  };

  return (
    <Modal
      isDismissable={false}
      shouldCloseOnInteractOutside={false}
      scrollBehavior="inside"
      size="2xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-white dark:bg-black border-[0.5px] border-color"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit Community</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={handleSubmitForm}
                validationBehavior="native"
                className="mt-4 flex flex-col items-start gap-6"
              >
                <Input
                  required
                  label="Community Name"
                  labelPlacement="outside"
                  placeholder="Enter community name..."
                  type="text"
                  name="name"
                  value={community.name}
                  onChange={handleInputChange}
                />

                <Input
                  required
                  label="Headline"
                  labelPlacement="outside"
                  placeholder="Enter headline (maximum 100 characters)"
                  type="text"
                  name="headline"
                  value={community.headline}
                  onChange={handleInputChange}
                />

                <Textarea
                  required
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Write about community (maximum 500 characters allowed)"
                  name="description"
                  maxLength={500}
                  minLength={100}
                  value={community.description}
                  onChange={handleInputChange}
                />

                <div>
                  <span className="text-sm">Change Community Logo</span>
                  <UploadLogo setLogoImage={setLogoImage} />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <span className="text-sm">
                    Rules for Community (Maximum 5 Allowed)
                  </span>
                  <Input
                    placeholder="Rule No. 01"
                    type="text"
                    value={rules[0]}
                    onChange={(e) =>
                      setRules((prev) =>
                        prev.map((rule, i) => (i !== 0 ? rule : e.target.value))
                      )
                    }
                  />
                  <Input
                    placeholder="Rule No. 02"
                    type="text"
                    value={rules[1]}
                    onChange={(e) =>
                      setRules((prev) =>
                        prev.map((rule, i) => (i !== 1 ? rule : e.target.value))
                      )
                    }
                  />
                  <Input
                    placeholder="Rule No. 03"
                    type="text"
                    value={rules[2]}
                    onChange={(e) =>
                      setRules((prev) =>
                        prev.map((rule, i) => (i !== 2 ? rule : e.target.value))
                      )
                    }
                  />
                  <Input
                    placeholder="Rule No. 04"
                    type="text"
                    value={rules[3]}
                    onChange={(e) =>
                      setRules((prev) =>
                        prev.map((rule, i) => (i !== 3 ? rule : e.target.value))
                      )
                    }
                  />
                  <Input
                    placeholder="Rule No. 05"
                    type="text"
                    value={rules[4]}
                    onChange={(e) =>
                      setRules((prev) =>
                        prev.map((rule, i) => (i !== 4 ? rule : e.target.value))
                      )
                    }
                  />
                </div>
                <Button
                  type="submit"
                  radius="full"
                  className="bg-[var(--main-color)] text-black"
                >
                  Update Community
                </Button>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditCommunityModal;
