import { Config } from "@remotion/cli/config";
import path from "path";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        "@remotion/google-fonts/Inter": path.resolve(__dirname, "google-fonts-shim.js"),
      },
    },
  };
});
