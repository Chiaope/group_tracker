import { Text, View, TextInput, Button, Alert } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { ExpenseData } from "./ExpenseListItem"
import DropDownPicker from "react-native-dropdown-picker"
import { useEffect, useState } from "react"
import { useAddExpense } from "@/app/Services/ExpenseServices"
import { CustomNumberInput, CustomTextInput, CustomDropDown } from "./CustomInputs"


const categoryList = [
    { label: 'Food', value: 'food' },
    { label: 'House', value: 'house' },
    { label: 'Health', value: 'health' },
    { label: 'Eating Out', value: 'eat_out' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Vehicle', value: 'vehicle' },
    { label: 'Transport', value: 'transport' },
]


export default function ExpenseForm() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ExpenseData>({})
    const [open, setOpen] = useState(false)
    const [addExpense, loading, inserted, error] = useAddExpense()
    const [resetKey, setResetKey] = useState(0)

    function resetFields() {
        setResetKey(resetKey + 1)
        console.log(resetKey)
        reset()
    }

    function onSubmit(data: ExpenseData) {
        data = { ...data, amount_cents: data.amount_cents * 100 }
        console.log('submit')
        console.log(data)
        addExpense(data)
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: "center",
        }}>
            <View style={{
            width: '80%',
            maxWidth: 800,
            alignItems: 'stretch',
            rowGap: 5
        }}>{inserted && <View>Inserted</View>}
            <Controller
                control={control}
                rules={{
                    required: true,
                    validate: {
                        isNum: (v: any) => {
                            return !isNaN(parseInt(v))
                        }
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomNumberInput
                        key={resetKey}
                        placeholder="Amount"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.amount_cents}
                    />
                )}
                name="amount_cents"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextInput
                        key={resetKey}
                        placeholder="Title"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.title}
                    />
                )}
                name="title"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => {
                    return (
                        // @ts-ignore
                        <CustomDropDown
                            placeholder="Category"
                            value={value}
                            searchable={true}
                            items={categoryList}
                            open={open}
                            setOpen={setOpen}
                            onSelectItem={(value: { value: any }) => {
                                onChange(value.value)
                            }}
                            error={errors.category}
                        />
                    )
                }}
                name="category"
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextInput
                        key={resetKey}
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
        </View>
    )
}