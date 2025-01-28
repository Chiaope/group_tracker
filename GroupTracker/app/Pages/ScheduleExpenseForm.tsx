import { View, Text, TouchableOpacity } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { categoryList, useScheduleExpense } from "@/app/Services/ExpenseServices"
import { CustomNumberInput, CustomTextInput, CustomDropDown } from "../Components/CustomInputs"
import { useNavigation } from "@react-navigation/native"
import { useToast, Toast, ToastTitle, ToastDescription } from '@/components/ui/toast'
import { ScheduledExpenseData } from "../Components/ScheduledExpenseListItem"

function generateDateFromMonthYearString(monthYearString: any, separator: string = '-') {
    let splittedMonthYear = monthYearString.split(separator)
    let month = Number(splittedMonthYear[0])
    let year = Number(splittedMonthYear[1])
    return new Date(Date.UTC(year, month - 1, 1))
}


export default function ScheduleExpenseForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ScheduledExpenseData>({})
    const [open, setOpen] = useState(false)
    const scheduleExpenseService = useScheduleExpense()
    const toast = useToast()
    const [selectedDate, setSelectedDate] = useState<null | Date>()

    function showNewToast(action: any, message: string) {
        const newId = Math.random().toString()
        toast.show({
            id: newId,
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast nativeID={uniqueToastId} action={action} variant="solid">
                        <ToastTitle>Status:</ToastTitle>
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
        if (!scheduleExpenseService.loading) {
            console.log('loading')
            if (scheduleExpenseService.error) {
                console.log(scheduleExpenseService.error)
                showNewToast("error", "Failed to schedule expense.")
            } else {
                if (scheduleExpenseService.scheduled) {
                    console.log('Scheduled successfully')
                    selectedDate && showNewToast("success", `Expense will be added on every 3rd of the month until last payment on ${selectedDate.toISOString().split('T')[0]}.`)
                    navigation.goBack()
                }
            }
        }
    }, [scheduleExpenseService.loading, scheduleExpenseService.scheduled, scheduleExpenseService.error])

    function onSubmit(data: ScheduledExpenseData) {
        data = { ...data, amount_cents: Math.round(data.amount_cents * 100) }
        console.log('submit')
        console.log(data)
        data.end_date = generateDateFromMonthYearString(data.end_date).toISOString().split('T')[0]
        scheduleExpenseService.scheduleExpense(data, '0 0 3 * *')
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
                    <View style={{ alignItems: 'center', padding: 10, backgroundColor: 'lightblue', borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>Schedule Expense</Text>
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
                    <View style={{ gap: 15 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text>Last Payment Month-Year</Text>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                                validate: (value) => {
                                                    console.log("Last Payment Date Value")
                                                    console.log(value)
                                                    if (value) {
                                                        let today = new Date()
                                                        let newDate = generateDateFromMonthYearString(value)

                                                        // @ts-ignore
                                                        if (!isNaN(newDate)) {
                                                            if (newDate <= today) {
                                                                return false
                                                            }
                                                            console.log(newDate)
                                                            setSelectedDate(newDate)
                                                            return true
                                                        } else {
                                                            return false
                                                        }
                                                    }
                                                }
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextInput
                                                    placeholder="MM-YYYY"
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    error={errors.end_date}
                                                />
                                            )}
                                            name="end_date"
                                        />
                                    </View>
                                </View>
                                {selectedDate && <Text>Will add expense on every 1st of the month, until last payment on {selectedDate.toISOString().split('T')[0]}</Text>}
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
                            disabled={scheduleExpenseService.loading}>
                            <Text style={{ textAlign: 'center' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}