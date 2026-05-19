import { CustomDropDown } from "@/CustomComponents/CustomInputs"
import { COLORS } from "@/Globals/GlobalConstants"
import { useGetUserAdminGroups, Group } from "@/Services/UserServices"
import { generateInviteToken } from "@/Utils/Encryption"
import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome6"
import * as Clipboard from 'expo-clipboard';

const inviteSecretKey = process.env.EXPO_PUBLIC_INVITE_SECRET_KEY || ""

export default function InviteGroup() {
    const getUserAdminGroupsService = useGetUserAdminGroups()
    const [open, setOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<number>()
    const [inviteToken, setInviteToken] = useState<string>()

    useEffect(() => {
        getUserAdminGroupsService.getUserAdminGroups()

    }, [])

    function getInviteToken() {
        selectedGroup && setInviteToken(generateInviteToken({ groupId: selectedGroup }, inviteSecretKey))
    }

    async function copyInviteToken() {
        inviteToken && await Clipboard.setStringAsync(inviteToken);
    }

    return <View style={{ padding: 20, gap: 10, alignSelf: 'center', width: '90%' }}>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>Invite Group</Text>
        </View>
        <CustomDropDown
            value={selectedGroup}
            items={getUserAdminGroupsService.adminGroups.map((adminGroupData: Group) => { return { 'label': adminGroupData.group_name, 'value': adminGroupData.id } })}
            open={open}
            setOpen={setOpen}
            onSelectItem={(value: { value: any }) => {
                setSelectedGroup(value.value)
            }}
        />
        <TouchableOpacity onPress={getInviteToken}
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.LIGHT_GREEN,
                borderRadius: 10,
                height: 50,
            }}
        >
            <Text style={{ fontSize: 20 }}>Generate Invitation Code</Text>
        </TouchableOpacity>
        {inviteToken && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 42 }}>{inviteToken}</Text>
            <TouchableOpacity onPress={copyInviteToken}>
                <Icon name="copy" size={42} />
            </TouchableOpacity>
        </View>}
    </View>
}
