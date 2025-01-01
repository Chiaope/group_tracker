import { TextInput } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"

export function CustomNumberInput(props: any, id:any) {
    let color = props.error ? 'red' : 'black'
    console.log('this is key')
    console.log(props.id)
    return (
        <TextInput
            key={id}
            style={{
                padding: 10,
                borderWidth: 1,
                margin: 1,
                borderColor: color
            }}
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
                borderColor: color
            }}
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