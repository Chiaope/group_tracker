import { CustomTextInput } from "@/app/Components/CustomInputs"
import { COLORS } from "@/app/Globals/GlobalConstants"
import { encryptVeryCompact } from "@/app/Utils/Encryption"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

export default function JoinGroup() {

    return <View style={{ padding: 20, gap: 10, alignSelf: 'center', width: '90%' }}>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>Join Group</Text>
        </View>
        <CustomTextInput placeholder="Invitation Code" />
        <TouchableOpacity
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.LIGHT_GREEN,
                borderRadius: 10,
                height: 50,
            }}
        >
            <Text style={{ fontSize: 20 }}>Join</Text>
        </TouchableOpacity>
        <View>

        </View>
    </View>
}
