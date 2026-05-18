import { Stack } from "expo-router";

export default function PagesLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { paddingTop: 50 } }}>
    <Stack.Screen name="Home" />
  </Stack>
}
