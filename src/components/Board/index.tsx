// import React from "react";

// import Field from "../Field";
// import { boardType } from "../../utils/logic";

// import { Container, FieldRows, FieldColumns } from "./styles";

// type BoardProps = {
//   board: boardType;
//   onOpenField: (r: number, c: number) => void;
//   onHoldField: (r: number, c: number) => void;
// };

// export default (props: BoardProps) => {
//   const rows = props.board.map((row, r) => {
//     const columns = row.map((field, c) => {
//       return (
//         <Field
//           {...field}
//           key={c}
//           onOpen={() => props.onOpenField(r, c)}
//           onHold={() => props.onHoldField(r, c)}
//         />
//       );
//     });
//     return <FieldColumns key={r}>{columns}</FieldColumns>;
//   });
//   return (
//     <Container>
//       <FieldRows>{rows}</FieldRows>
//     </Container>
//   );
// };
export {};
