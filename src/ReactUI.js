// export default function ReactUI(){
//   return <div></div>;
// }
import React, {useEffect, useState} from "react";
import Card from "./ReactComponents/card";
import AboutMeModal from "./ReactComponents/Modals/aboutMeModal";
import UnityModal from "./ReactComponents/Modals/unityModal";
import { on } from "./store";

export default function ReactUI() {

    const [isAboutMeModalVisible, setAboutMeModalVisible] = useState(false);
    const [isUnityModalVisible, setUnityModalVisible] = useState(false);

    useEffect(() => {
      on("aboutMe", () => {
        console.log("About me modal triggered");
        setAboutMeModalVisible(true);
      });
    }, []);

    useEffect(() => {
      on("unity", () => {
        console.log("Unity modal triggered");
        setUnityModalVisible(true);
      });
    }, []);

    return (
      <div>
        <AboutMeModal
          visible={isAboutMeModalVisible}
          onClose={() => setAboutMeModalVisible(false)}
        />
        <UnityModal
          visible={isUnityModalVisible}
          onClose={() => setUnityModalVisible(false)}
        />
      </div>
);
}