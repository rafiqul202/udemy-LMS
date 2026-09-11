import { Button } from "@/components/ui/button";
import { CircleFadingArrowUpIcon } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="">
      Home page
      <Button size="icon">
        <CircleFadingArrowUpIcon />
      </Button>
    </div>
  );
};

export default Navbar;
