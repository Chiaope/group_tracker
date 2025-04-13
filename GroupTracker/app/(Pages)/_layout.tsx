import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function PagesLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { paddingTop: 50 } }}>
    <Stack.Screen name="Home" />
  </Stack>
}
