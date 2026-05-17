import { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, AppState, Image, ActivityIndicator, Keyboard } from 'react-native'
import { supabase } from '@/Utils/supabase'
import { useShowToast } from '@/CustomComponents/CustomToast';
import { router } from 'expo-router';
import { Text } from 'react-native';
import { CustomTextInputWithIcon } from '@/CustomComponents/CustomInputs';
import { APP_CONSTANTS, COLORS } from '@/Globals/GlobalConstants'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Auth() {
    const [token, setToken] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [showTokenInput, setShowTokenInput] = useState<boolean>(false)
    const toast = useShowToast()

    async function signInWithOTP() {
        Keyboard.dismiss()
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
        })
        if (error) {
            toast.showToast("error", 'Something wrong with getting token.')
        } else {
            toast.showToast("success", "Please provide token to login.")
            setShowTokenInput(true)
        }
        setLoading(false)
    }

    async function verifyOtp() {
        Keyboard.dismiss()
        setLoading(true)
        const { data: { session }, error, } = await supabase.auth.verifyOtp({
            email,
            token: token,
            type: 'email',
        })

        if (error) {
            toast.showToast("error", error.message)
        } else {
            toast.showToast("success", "Logged In")
            router.navigate('/')
        }
        setLoading(false)
    }
    const imagePath = require("../../assets/images/astronaut-sitting.png")

    return <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='interactive'>
        {loading && <View style={{ padding: 25, position: 'absolute', top: 0, left: 0, right: 0 }}>
            <ActivityIndicator size="large" color={COLORS.SPINNER} />
        </View>}
        <View style={{ alignItems: 'center', marginTop: 50 }}>
            <View style={{ borderRadius: 30, padding: 10, borderWidth: 5, borderColor: '#333333' }}>
                <Text style={{ fontSize: 42, color: '#333333' }}>{APP_CONSTANTS.APP_NAME}</Text>
            </View>
            <Image
                source={imagePath}
                style={{
                    height: 300,
                    width: 300
                }}
            />
            <View style={{ alignItems: 'center', gap: 10 }}>
                <CustomTextInputWithIcon
                    textProps={{
                        onChangeText: (text: string) => setEmail(text),
                        value: email,
                        placeholder: "space-cadet@address.com",
                        autoCapitalize: 'none',
                        style: { flex: 1, marginHorizontal: 10 }
                    }}
                    iconTouchProps={{ onPress: () => signInWithOTP() }}
                    iconStyleProps={{ name: 'arrow-right' }}
                />
                {showTokenInput && <>
                    <CustomTextInputWithIcon
                        textProps={{
                            onChangeText: (text: string) => setToken(text),
                            value: token,
                            placeholder: "token",
                            autoCapitalize: 'none',
                            style: { flex: 1, marginHorizontal: 10 }
                        }}
                        iconTouchProps={{ onPress: () => verifyOtp() }}
                        iconStyleProps={{ name: 'rocket' }}
                    />
                </>}
            </View>
        </View>
    </KeyboardAwareScrollView>
}