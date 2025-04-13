import { CustomDropDown } from "@/app/Components/CustomInputs"
import { UserContext } from "@/app/Context/UserContext"
import { COLORS } from "@/app/Globals/GlobalConstants"
import { UserGroupData } from "@/app/Services/UserServices"
import { encryptVeryCompact } from "@/app/Utils/Encryption"
import { useContext, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome6"
import * as Clipboard from 'expo-clipboard';

export default function InviteGroup() {
    const { user } = useContext(UserContext)
    const [open, setOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<number>()
    const [inviteToken, setInviteToken] = useState<string>()

    function generateInviteToken() {
        selectedGroup && setInviteToken(encryptVeryCompact({ groupId: selectedGroup }, 'abc'))
    }

    async function copyInviteToken(){
        inviteToken && await Clipboard.setStringAsync(inviteToken);
    }

    return <View style={{ padding: 20, gap: 10, alignSelf: 'center', width: '90%' }}>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>Invite Group</Text>
        </View>
        <View>
            <CustomDropDown
                value={selectedGroup}
                items={user.userGroupData.map((groupData: UserGroupData) => { return { 'label': groupData.group_name, 'value': groupData.group_id } })}
                open={open}
                setOpen={setOpen}
                onSelectItem={(value: { value: any }) => {
                    setSelectedGroup(value.value)
                }}
            />
        </View>
        <TouchableOpacity onPress={generateInviteToken}
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
