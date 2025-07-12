import React, { useEffect, useState } from "react";
import { on, emit } from "./store";
import { modalsConfig } from "./Components/modalConfig";

export default function ReactUI() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    Object.keys(modalsConfig).forEach((modalKey) => {
      on(modalKey, () => {
        //console.log(`${modalKey} modal triggered`);
        setActiveModal(modalKey);
      });
    });
  }, []);

  const ActiveModal = activeModal ? modalsConfig[activeModal].component : null;

  return (
    <div>
      {ActiveModal && (
        <ActiveModal
          visible={true}
          onClose={() => {
            setActiveModal(null);
            emit("modalClosed");
          }}
        />
      )}
    </div>
  );
}