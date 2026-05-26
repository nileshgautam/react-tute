import { useState } from "react";
import Portal from "./components/Portal/Portal";
import Modal from "./components/Modal/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal"
      >
        <p>Hello from Modal!</p>

      </Modal>
    </div>
  );

}

export default App;