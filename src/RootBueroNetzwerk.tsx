import { Composition } from "remotion";
import { BueroNetzwerkVideo } from "./BueroNetzwerk/BueroNetzwerkVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BueroNetzwerk"
      component={BueroNetzwerkVideo}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
