import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Auth from "../Components/Auth";
import MyDrawer from "../Drawer/_layout";
import { ActivityIndicator, View } from "react-native";

export default function Home() {
    const { user, loading } = useContext(UserContext)

    return <>
        {loading && <View style={{ padding: 25, position: 'absolute', top: 0, left: 0, right: 0 }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>}
        {user?.id && !loading ? <MyDrawer /> : <Auth />}
    </>
}
