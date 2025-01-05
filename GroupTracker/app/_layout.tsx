import MyDrawer from "./Drawer/_layout";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return <GluestackUIProvider mode="light"><MyDrawer /></GluestackUIProvider>;
}
