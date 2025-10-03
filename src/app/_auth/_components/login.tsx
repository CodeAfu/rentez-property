"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { MouseEvent, Fragment, useState } from "react";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Button size="sm" variant="outline" onClick={handleModal}>
        Login
      </Button>

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-between">
            <h1 className="font-semibold select-none text-xl">Login</h1>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="rounded-full"
            >
              <X className="aspect-square size-6 stroke-" />
            </Button>
          </div>

          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <label className="ml-1 select-none text-sm">
                  Email Address:
                </label>
                <Input placeholder="Enter email address" />
              </div>
              <div>
                <label className="ml-1 select-none text-sm">Password:</label>
                <Input type="password" placeholder="Enter password" />
              </div>
            </div>
            <Button onClick={handleClick}>Login</Button>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
}
