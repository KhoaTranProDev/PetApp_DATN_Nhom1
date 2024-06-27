import styled from "styled-components/native";

export const OTPInputContainer = styled.View`
 justify-content: center;
 align-items: center;
`;

export const TextInputHidden = styled.TextInput`
 width: 300px;
 border-color: #e5e5e5;
 border-width: 1px;
 border-radius: 5px;
 padding: 15px;
 position: absolute;
 opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
 width: 90%;
 flex-direction: row;
 justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
 border-color: #e5e5e5;
 border-width: 2px;
 border-radius: 5px;
 padding: 12px;
 margin: 12px;
 min-width: 50px;
`;

export const SplitBoxText = styled.Text`
 font-size: 20px;
 text-align: center;
 color: #e5e5e5;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
 border-color: #ecdbba;
 background-color: #71797E;
`;