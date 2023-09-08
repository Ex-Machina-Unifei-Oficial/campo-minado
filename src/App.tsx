import "./App.css";
import { Field } from "./components/Field";
import { Flag } from "./components/Flag";

function App() {
  return (
    <>
      <Field
        initalState={"flagged"}
        nearMines={1}
        hasMine={false}
        onOpen={() => {}}
        onHold={() => {}}
      />
      <Field
        initalState={"closed"}
        nearMines={2}
        hasMine={false}
        onOpen={() => {}}
        onHold={() => {}}
      />
      <Field
        initalState={"closed"}
        nearMines={3}
        hasMine={true}
        onOpen={() => {}}
        onHold={() => {}}
      />
      <Field
        initalState={"opened"}
        nearMines={4}
        hasMine={true}
        onOpen={() => {}}
        onHold={() => {}}
      />
      <Field
        initalState={"opened"}
        nearMines={4}
        hasMine={false}
        onOpen={() => {}}
        onHold={() => {}}
      />

      <Flag bigger />
    </>
  );
}

export default App;
