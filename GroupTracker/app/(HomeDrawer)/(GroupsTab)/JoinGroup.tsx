import { CustomTextInput } from "@/CustomComponents/CustomInputs"
import { useShowToast } from "@/CustomComponents/CustomToast"
import { COLORS } from "@/Globals/GlobalConstants"
import { useJoinGroup } from "@/Services/GroupServices"
import { decodeInviteToken } from "@/Utils/Encryption"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"

const inviteSecretKey = process.env.EXPO_PUBLIC_INVITE_SECRET_KEY || ""

export default function JoinGroup() {
    const [inviteCode, setInvideCode] = useState<string>('')
    const toast = useShowToast()
    const joinGroupService = useJoinGroup()

    useEffect(() => {
        if (!joinGroupService.loading) {
            if (joinGroupService.error) {
                console.log(joinGroupService.error)
                toast.showToast("error", "Failed to join group.")
            } else {
                if (joinGroupService.joined) {
                    console.log('Join group successfully')
                    toast.showToast("success", "Successfully joined group.")
                    router.replace('/')
                }
            }
        }
    }, [joinGroupService.loading, joinGroupService.joined, joinGroupService.error])

    function joinGroupPressed() {
        const decrypted = decodeInviteToken(inviteCode, inviteSecretKey)
        joinGroupService.joinGroup(decrypted?.groupId)
    }


    return <>
        {joinGroupService.loading && <View style={{ padding: 25, position: 'absolute', top: 0, left: 0, right: 0 }}>
            <ActivityIndicator size="large" color={COLORS.SPINNER} />
        </View>}
        <View style={{ padding: 20, gap: 10, alignSelf: 'center', width: '90%' }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>Join Group</Text>
            </View>
            <CustomTextInput
                placeholder="Invitation Code"
                onChangeText={setInvideCode}
                value={inviteCode}
            />
            <TouchableOpacity
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.LIGHT_GREEN,
                    borderRadius: 10,
                    height: 50,
                }}
                onPress={joinGroupPressed}
                disabled={joinGroupService.loading}
            >
                <Text style={{ fontSize: 20 }}>Join</Text>
            </TouchableOpacity>
        </View>
    </>

}
