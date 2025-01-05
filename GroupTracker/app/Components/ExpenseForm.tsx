import { View, Button, Text } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { ExpenseData } from "./ExpenseListItem"
import { useEffect, useState } from "react"
import { useAddExpense } from "@/app/Services/ExpenseServices"
import { CustomNumberInput, CustomTextInput, CustomDropDown } from "./CustomInputs"
import { useNavigation } from "@react-navigation/native"
import { useToast, Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';


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
        formState: { errors },
    } = useForm<ExpenseData>({})
    const [open, setOpen] = useState(false)
    const [addExpense, loading, inserted, error] = useAddExpense()
    const toast = useToast()
    const [toastId, setToastId] = useState<string>('0')


    function showNewToast(action: any, message: string) {
        const newId = Math.random().toString()
        setToastId(newId)
        toast.show({
            id: newId,
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast nativeID={uniqueToastId} action={action} variant="solid">
                        <ToastTitle>Hello!</ToastTitle>
                        <ToastDescription>
                            {message}
                        </ToastDescription>
                    </Toast>
                )
            },
        })
    }
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (!loading) {
            console.log('loading')
            console.log()
            if (error) {
                console.log(error)
                showNewToast("error", "Failed to insert expense.")
            } else {
                if (inserted) {
                    console.log('Inserted successfully')
                    showNewToast("success", "Successfully inserted expense.")
                    navigation.goBack()
                }
            }
        }
    }, [loading, inserted, error])

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
            }}>
                <Text>Amount</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        validate: {
                            isNum: (v: any) => {
                                let regString = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/
                                let reg = new RegExp(regString)
                                console.log(v)
                                return reg.test(v) && Math.round(parseFloat(v) * 100) / 100 > 0
                            }
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomNumberInput
                            placeholder="Amount"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.amount_cents}
                        />
                    )}
                    name="amount_cents"
                />

                <Text>Title</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            placeholder="Title"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.title}
                        />
                    )}
                    name="title"
                />

                <Text>Category</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
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

                <Text>Description</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            placeholder="Description"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value || undefined}
                        />
                    )}
                    name="description"
                />
                <Button title="Submit" onPress={handleSubmit(onSubmit)} disabled={loading} />
            </View>
        </View>
    )
}