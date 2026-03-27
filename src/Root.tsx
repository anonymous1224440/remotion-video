import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { FinancialVerificationVideo } from "./FinancialVerification/FinancialVerificationVideo";
import { PropertyAutomationVideo } from "./PropertyAutomation/PropertyAutomationVideo";
import { OperationsAutomationVideo } from "./OperationsAutomation/OperationsAutomationVideo";

// Total duration: 75s at 30fps = 2250 frames, minus 4 transitions of 15 frames each = 2190
const PROPERTY_AUTOMATION_DURATION = 2250 - 4 * 15;
const OPERATIONS_AUTOMATION_DURATION = 2250 - 4 * 15;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="FinancialVerificationVideo"
        component={FinancialVerificationVideo}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PropertyAutomationVideo"
        component={PropertyAutomationVideo}
        durationInFrames={PROPERTY_AUTOMATION_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OperationsAutomationVideo"
        component={OperationsAutomationVideo}
        durationInFrames={OPERATIONS_AUTOMATION_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
