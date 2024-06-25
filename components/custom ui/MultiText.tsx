"use client";

import React, { useState } from "react";

import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />

      <div className="mt-4 flex flex-wrap gap-1">
        {value.map((item, index) => (
          <Badge key={index} className="bg-gray-400 text-white">
            {item}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-500"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
