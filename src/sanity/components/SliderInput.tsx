import React from "react";
import { NumberInputProps, set, unset } from "sanity";
import { Flex, Box, TextInput } from "@sanity/ui";

interface SliderOptions {
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

export interface SliderInputProps extends NumberInputProps {
  schemaType: NumberInputProps["schemaType"] & {
    options?: {
      slider?: SliderOptions;
    } & Record<string, any>;
  };
}

export function SliderInput(props: SliderInputProps) {
  const { value = 0, onChange, schemaType, elementProps, readOnly } = props;

  const {
    min = 0,
    max = 100,
    step = 1,
    suffix = "",
  } = schemaType.options?.slider || {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    onChange(isNaN(newValue) ? unset() : set(newValue));
  };

  const sliderValue = typeof value === "number" ? value : min;

  return (
    <Flex align="center" gap={3}>
      <Box flex={1}>
        <input
          {...elementProps}
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleChange}
          readOnly={readOnly}
          style={{
            width: "100%",
            height: "calc(var(--spacing) * 1.5)",
            borderRadius: "calc(var(--spacing) * 0.75)",
            background: "var(--card-muted-bg-color)",
            color: "var(--card-muted-fg-color)",
            borderColor: "var(--card-border-color)",
            outline: "none",
            WebkitAppearance: "none",
            appearance: "none",
            cursor: readOnly ? "default" : "pointer",
          }}
          className="[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--card-fg-color)] focus:[&::-moz-range-thumb]:bg-[var(--card-focus-ring-color)] [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--card-fg-color)] focus:[&::-webkit-slider-thumb]:bg-[var(--card-focus-ring-color)]"
        />
      </Box>
      <TextInput
        type="number"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        readOnly={readOnly}
        style={{
          width: "calc(var(--spacing) * 15)",
          textAlign: "center" as const,
        }}
        className="[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--card-muted-fg-color)",
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        {suffix}
      </span>
    </Flex>
  );
}
