import { TextInput } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"

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
            keyboardType="numeric"
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
            {...props}
        />
    )
}