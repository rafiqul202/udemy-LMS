import { Button } from "@/components/ui/button";
import React from "react";
import FormControls from "./common-form";

const CommonForm = ({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonFormDisabled=false,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonFormDisabled} type="submit" className="w-full mt-5">
        {buttonText ?? "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
