import { View, Text, TouchableOpacity } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { ExpenseData } from "../Components/ExpenseListItem"
import { useEffect, useState } from "react"
import { categoryList, useAddExpense } from "@/app/Services/ExpenseServices"
import { CustomNumberInput, CustomTextInput, CustomDropDown } from "../Components/CustomInputs"
import { useNavigation } from "@react-navigation/native"
import { useShowToast } from "../Components/CustomToast"


export default function ExpenseForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ExpenseData>({})
    const [open, setOpen] = useState(false)
    const addExpenseService = useAddExpense()
    const toast = useShowToast()
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (!addExpenseService.loading) {
            console.log('loading')
            if (addExpenseService.error) {
                console.log(addExpenseService.error)
                toast.showToast("error", "Failed to insert expense.")
            } else {
                if (addExpenseService.inserted) {
                    console.log('Inserted successfully')
                    toast.showToast("success", "Successfully inserted expense.")
                    navigation.goBack()
                }
            }
        }
    }, [addExpenseService.loading, addExpenseService.inserted, addExpenseService.error])

    function onSubmit(data: ExpenseData) {
        data = { ...data, amount_cents: Math.round(data.amount_cents * 100) }
        console.log('submit')
        console.log(data)
        addExpenseService.addExpense(data)
    }

    function onCancel() {
        navigation.goBack()
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: "center",
                padding: 10
            }}>
                <View style={{
                    width: '80%',
                    maxWidth: 800,
                    alignItems: 'stretch',
                    rowGap: 5
                }}>
                    <View style={{alignItems: 'center', padding: 10, backgroundColor: 'lightblue', borderRadius: 10}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>Immediate Expense</Text>
                    </View>
                    <View>
                        <Text>Amount</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                validate: (value) => {
                                    console.log("value")
                                    console.log(value)
                                    return /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/.test(String(value))
                                }
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
                    </View>
                    <View>
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
                    </View>
                    <View>
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
                    </View>
                    <View>
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
                            </View>
                    <View style={{ flexDirection: 'row', gap: 15, marginTop: 20 }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            padding: 10,
                            backgroundColor: 'red',
                            borderRadius: 10
                        }}
                            onPress={onCancel}>
                            <Text style={{ textAlign: 'center' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex: 1,
                            padding: 10,
                            backgroundColor: 'lightblue',
                            borderRadius: 10
                        }}
                            onPress={handleSubmit(onSubmit)}
                            disabled={addExpenseService.loading}>
                            <Text style={{ textAlign: 'center' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}