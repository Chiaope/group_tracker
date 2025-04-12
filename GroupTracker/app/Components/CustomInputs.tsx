import { Keyboard, TextInput, TouchableOpacity, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import Icon from 'react-native-vector-icons/FontAwesome6';

export function CustomNumberInput(props: any) {
    let color = props.error ? 'red' : 'black'
    return (
        <TextInput
            style={{
                padding: 10,
                borderWidth: 1,
                margin: 1,
                borderColor: color
            }}
            placeholderTextColor={'black'}
            {...props}
            value={props.value}
            // use this in the mean time and create something else in the future
            keyboardType="numbers-and-punctuation"
        />
    )
}

export function CustomTextInput(props: any) {
    let color = props.error ? 'red' : 'black'
    return (
        <TextInput
            style={{
                padding: 10,
                borderWidth: 1,
                margin: 1,
                borderColor: color,
            }}
            placeholderTextColor={'black'}
            {...props}
        />
    )
}

export function CustomDropDown(props: any) {
    let color = props.error ? 'red' : 'black'
    return (
        <DropDownPicker
            style={{
                borderColor: color,
                backgroundColor: 'transparent'
            }}
            onPress={Keyboard.dismiss}
            {...props}
        />
    )
}

export function CustomTextInputWithIcon(props: any) {
    const mainContainerProps = props.mainContainerProps
    const mainStyleProps = props.mainStyleProps
    const textProps = props.textProps
    const iconTouchProps = props.iconTouchProps
    const iconStyleProps = props.iconStyleProps
    return <View
        style={{
            flexDirection: 'row',
            width: 300,
            height: 50,
            paddingHorizontal: 20,
            backgroundColor: '#dadada',
            borderRadius: 30,
            justifyContent: 'space-between',
            ...mainStyleProps
        }}
        {...mainContainerProps}
    >
        <TextInput
            style={{ flex: 1, marginHorizontal: 10 }}
            {...textProps}
        />
        <TouchableOpacity
            style={{ justifyContent: 'center' }}
            {...iconTouchProps}
        >
            <Icon
                size={25}
                {...iconStyleProps}
            />
        </TouchableOpacity>
    </View>
}