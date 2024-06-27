import React, { useEffect, useRef, useState } from "react";
import {
  OTPInputContainer,
  TextInputHidden,
  SplitOTPBoxesContainer,
  SplitBoxes,
  SplitBoxText,
  SplitBoxesFocused,
} from "./Styles";

const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
  const inputRef = useRef();
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleBlur = () => {
    setIsInputBoxFocused(false);
  };

  const boxArray = new Array(maximumLength).fill(0);

  const boxDigit = (_, index) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;

    return (
      <StyledSplitBoxes key={index}>
        <SplitBoxText>{digit}</SplitBoxText>
      </StyledSplitBoxes>
    );
  };

  return (
    <OTPInputContainer>
      <SplitOTPBoxesContainer onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </SplitOTPBoxesContainer>
      <TextInputHidden
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleBlur}
      />
    </OTPInputContainer>
  );
};

export default OTPInput;
