import React, { useEffect, useState } from "react";

// About Me
import AboutMeModal from "./ReactComponents/Modals/aboutMeModal";

// Studies
import ESOModal from "./ReactComponents/Modals/Studies/esoModal";
import ITModal from "./ReactComponents/Modals/Studies/itModal";
import BachelorModal from "./ReactComponents/Modals/Studies/bachelorModal";
import MasterModal from "./ReactComponents/Modals/Studies/masterModal";

// Experience
import IISLAFEModal from "./ReactComponents/Modals/Experience/iislafeModal";
import MindTripsModal from "./ReactComponents/Modals/Experience/mindTripsModal";
import OWNModal from "./ReactComponents/Modals/Experience/ownModal";
import CanteraModal from "./ReactComponents/Modals/Experience/canteraModal";
import AEMEModal from "./ReactComponents/Modals/Experience/aemeModal";
import HechiceriaModal from "./ReactComponents/Modals/Experience/hechiceriaModal";

// Skills
import UnityModal from "./ReactComponents/Modals/Skills/unityModal";
import UEModal from "./ReactComponents/Modals/Skills/ueModal.js";
import ReactModal from "./ReactComponents/Modals/Skills/reactModal";
import SpringModal from "./ReactComponents/Modals/Skills/springModal";
import LaravelModal from "./ReactComponents/Modals/Skills/laravelModal.js";
import CodeLanguagesModal from "./ReactComponents/Modals/Skills/codeLanguagesModal";


import { on, emit } from "./store";

const modalsConfig = {
  aboutMe: { component: AboutMeModal },

  ESO: { component: ESOModal },
  IT: { component: ITModal },
  bachelor: { component: BachelorModal },
  master: { component: MasterModal },

  iislafe: { component: IISLAFEModal },
  mindTrips: { component: MindTripsModal },
  OWN: { component: OWNModal },
  cantera: { component: CanteraModal },
  aeme: { component: AEMEModal },
  hechiceria: { component: HechiceriaModal },

  unity: { component: UnityModal },
  ue: { component: UEModal },
  react: { component: ReactModal },
  spring: { component: SpringModal },
  laravel: { component: LaravelModal },
  codeLanguages: { component: CodeLanguagesModal },
};

export default function ReactUI() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    Object.keys(modalsConfig).forEach((modalKey) => {
      on(modalKey, () => {
        console.log(`${modalKey} modal triggered`);
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
