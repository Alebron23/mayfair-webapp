import React from "react";
import MaskedInput from "react-text-mask";

export function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d|x/,
        /\d|x/,
        /\d|x/,
        "-",
        /\d|x/,
        /\d|x/,
        "-",
        /\d|x/,
        /\d|x/,
        /\d|x/,
        /\d|x/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}
