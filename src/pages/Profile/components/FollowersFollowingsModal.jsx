import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  User,
} from "@nextui-org/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function FollowersFollowingsModal({ isOpen, onOpenChange, isFollowersModal }) {
  //For handling follow and unfollow
  const followUnfollowHandler = () => {};

  useEffect(() => {
    // Only for marking fethching will be in different file
    if (isFollowersModal) {
      // Fetch followers
    } else {
      //Fetch Followings
    }
  }, []);

  return (
    <>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center items-center">
                {isFollowersModal ? "Followers" : "Followings"}
              </ModalHeader>
              <ModalBody>
                {Array(80)
                  .fill(0)
                  .map((_, i) => (
                    <div className="flex items-center justify-between">
                      <Link to={"#"}>
                        <User
                          avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                          }}
                          description="@sachin777s"
                          name="Jane Doe"
                        />
                      </Link>

                      <Button
                        onClick={followUnfollowHandler}
                        radius="full"
                        className="bg-[var(--main-color)] text-white font-semibold"
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default FollowersFollowingsModal;
