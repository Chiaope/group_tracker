import { Text, View, TextInput, Button } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { ExpenseData } from "./ExpenseListItem"
import DropDownPicker from "react-native-dropdown-picker"
import { useState } from "react"


const categoryList = [
    { label: 'Label Food', value: 'food' },
    { label: 'Label House', value: 'house' },
    { label: 'Label Health', value: 'health' }
]


export default function App() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ExpenseData>({})
    const [open, setOpen] = useState(false)
    // const [value, setValue] = useState(null)
    const [items, setItems] = useState(categoryList)

    const onSubmit = (data: any) => console.log(data)


    return (
        <View style={{
            width: '80%',
            maxWidth: 800
        }}>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Amount"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value ? value.toString() : undefined}
                        keyboardType="numeric"
                    />
                )}
                name="amount_cents"
            />
            {errors.amount_cents && <Text>This is required.</Text>}


            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Title"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="title"
            />
            {errors.title && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => {
                    console.log(value)
                    return (
                        // @ts-ignore
                        <DropDownPicker
                            placeholder="Category"
                            value={value}
                            searchable={true}
                            items={items}
                            open={open}
                            setOpen={setOpen}
                            onSelectItem={(value) => {
                                onChange(value.value)
                            }}
                        />
                    )
                }}
                name="category"
            />
            {errors.category && <Text>This is required.</Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Description"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value || undefined}
                    />
                )}
                name="description"
            />


            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}