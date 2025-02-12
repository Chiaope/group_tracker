import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Auth from "../Components/Auth";
import MyDrawer from "../Drawer/_layout";

export default function Home() {
    const { user } = useContext(UserContext)

    return <GluestackUIProvider mode="light">
        {user?.id ? <MyDrawer /> : <Auth />}
    </GluestackUIProvider>
}
