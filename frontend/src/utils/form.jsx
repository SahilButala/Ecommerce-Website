import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import React from "react";

const CommonFormComponent = ({
  formControls,
  formdata,
  setformData,
  onFormSubmit,
  buttonText,
  isLoading,
  isDisabled
}) => {
  const renderInputByItsType = (getControlItem) => {
    const value = formdata[getControlItem.name] || "";
    let element = null;
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            type={getControlItem.type}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setformData({
                ...formdata,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(val) =>
              setformData({
                ...formdata,
                [getControlItem.name]: val,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            id={getControlItem.name}
            name={getControlItem.name}
            value={value}
            onChange={(e) =>
              setformData({
                ...formdata,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            type={getControlItem.type}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setformData({
                ...formdata,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        {formControls.map((controlItem, i) => (
          <div className="grid w-full gap-1.5  mb-2" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputByItsType(controlItem)}
          </div>
        ))}
      </div>
      {isLoading ? (
        <Button>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait..
        </Button>
      ) : (
        <Button disabled = {isDisabled} className="mt-2 w-full">{buttonText || "Submit"}</Button>
      )}
    </form>
  );
};

export default CommonFormComponent;
