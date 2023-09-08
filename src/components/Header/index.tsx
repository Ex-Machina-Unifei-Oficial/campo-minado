// import React from "react";
// import Ionicons from "react-native-vector-icons/Ionicons";

// import params from "../../utils/params";
// import themes from "../../themes";
// import Flag from "../Flag";

// import { Container, FlagContainer, FlagButton, Label, Button } from "./styles";

// type HeaderProps = {
//   onNewGame: () => void;
//   onNewGameLongPress: () => void;
//   onFlagPress: () => void;
//   onMenu: () => void;
//   flagsLeft: number;
// };

// export default (props: HeaderProps) => {
//   return (
//     <Container>
//       <Button onPress={props.onMenu}>
//         <Ionicons
//           name="menu"
//           size={30}
//           color={themes[params.theme].colors.textPrimary}
//         />
//       </Button>
//       <Button
//         onPress={props.onNewGame}
//         onLongPress={props.onNewGameLongPress}
//         delayLongPress={1000}
//       >
//         <Label>Novo Jogo</Label>
//       </Button>
//       <FlagContainer>
//         <FlagButton onPress={props.onFlagPress}>
//           <Flag bigger />
//         </FlagButton>
//         <Label>= {props.flagsLeft}</Label>
//       </FlagContainer>
//     </Container>
//   );
// };
export {};
