import { Box, Button, NumberInput, NumberInputProps } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { FC } from "react";

export const StepperInput: FC<NumberInputProps> = (props) => {
  return (
    <>
      <NumberInput
        {...props}
        styles={{
          input: { borderRadius: 0, textAlign: "center" },
          wrapper: { margin: 0 },
        }}
        hideControls
        inputContainer={(children) => (
          <Box
            style={() => ({
              display: "grid",
              gridTemplateColumns: "1fr 2.5fr 1fr",
              alignItems: "center",
              marginBottom: 4,
            })}
          >
            <Button
              style={(theme) => ({
                gridColumnStart: 1,
                height: "100%",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderColor: props.error ? theme.colors.red[6] : undefined,
                borderRightWidth: 0,
              })}
              variant={"default"}
              color={"gray"}
              m={0}
              onClick={() => {
                if (!props.onChange) return;

                if (
                  props.value === undefined ||
                  typeof props.value === "number"
                )
                  return props.onChange((props.value ?? 0) - 1);
              }}
            >
              <IconMinus color={props.error ? "#fa5252" : undefined} />
            </Button>
            <Box
              style={{
                gridColumnStart: 2,
              }}
            >
              {children}
            </Box>
            <Button
              style={(theme) => ({
                gridColumnStart: 3,
                height: "100%",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderColor: props.error ? theme.colors.red[6] : undefined,
                borderLeftWidth: 0,
              })}
              color={"gray"}
              variant={"default"}
              onClick={() => {
                if (!props.onChange) return;

                if (
                  props.value === undefined ||
                  typeof props.value === "number"
                )
                  return props.onChange((props.value ?? 0) + 1);
              }}
            >
              <IconPlus color={props.error ? "#fa5252" : undefined} />
            </Button>
          </Box>
        )}
      />
    </>
  );
};
