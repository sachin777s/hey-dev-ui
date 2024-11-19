import { Navbar } from '@nextui-org/react'
import React from 'react'
import { BsDot, BsSearch } from 'react-icons/bs'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CommunitiesNavbar = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Navbar isBordered>
      <div className='flex items-center'>
        <BsDot /> <h1 className='text-xl font-semibold'>Communities</h1>
      </div>
      <div className='flex items-center justify- gap-2'>
        <div>
          <BsSearch onClick={onOpen} />
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Link to={"/communities/start-community"}>
          <AiOutlineUsergroupAdd size={22} />
        </Link>
      </div>
    </Navbar>
  )
}

export default CommunitiesNavbar