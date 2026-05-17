import { View, Text, TouchableOpacity } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import { useScheduleExpense } from "@/Services/ExpenseServices"
import { useNavigation } from "@react-navigation/native"
import { UserContext } from "@/Context/UserContext"
import { CustomNumberInput, CustomTextInput, CustomDropDown } from "@/CustomComponents/CustomInputs"
import { useShowToast } from "@/CustomComponents/CustomToast"
import { ScheduledExpenseData } from "@/CustomComponents/ScheduledExpenseListItem"
import { useCategoryService } from "@/Services/CategoryServices"
import { COLORS } from "@/Globals/GlobalConstants"

function generateDateFromMonthYearString(monthYearString: any, separator: string = '-') {
    let splittedMonthYear = monthYearString.split(separator)
    let month = Number(splittedMonthYear[0])
    let year = Number(splittedMonthYear[1])
    return new Date(Date.UTC(year, month - 1, 3))
}


export default function ScheduleExpenseForm() {
    const { user } = useContext(UserContext)
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ScheduledExpenseData>({
        defaultValues: {
            // @ts-ignore
            amount_cents: '',
            category: '',
            end_date: '',
            title: ''
        }
    })
    const [open, setOpen] = useState(false)
    const scheduleExpenseService = useScheduleExpense()
    const toast = useShowToast()
    const [selectedDate, setSelectedDate] = useState<null | Date>()
    const navigation = useNavigation<any>();
    const categoryServices = useCategoryService()

    function handleGoBack() {
        reset()
        navigation.goBack()
    }

    useEffect(() => {
        categoryServices.getMappedCategoryList()
    }, [user.selectedGroup])

    useEffect(() => {
        if (!scheduleExpenseService.loading) {
            console.log('loading')
            if (scheduleExpenseService.error) {
                console.log(scheduleExpenseService.error)
                toast.showToast("error", "Failed to schedule expense.")
            } else {
                if (scheduleExpenseService.scheduled) {
                    console.log('Scheduled successfully')
                    selectedDate && toast.showToast("success", `Expense will be added on every 3rd of the month until last payment on ${selectedDate.toISOString().split('T')[0]}.`)
                    handleGoBack()
                }
            }
        }
    }, [scheduleExpenseService.loading, scheduleExpenseService.scheduled, scheduleExpenseService.error])

    function onSubmit(data: ScheduledExpenseData) {
        data = { ...data, amount_cents: Math.round(data.amount_cents * 100) }
        console.log('submit')
        console.log(data)
        data.end_date = generateDateFromMonthYearString(data.end_date).toISOString().split('T')[0]
        scheduleExpenseService.scheduleExpense(user.selectedGroup, data, '0 0 3 * *')
    }

    function onCancel() {
        handleGoBack()
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
                            <>
                                <Text>Amount</Text>
                                <CustomNumberInput
                                    placeholder="Amount"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.amount_cents}
                                />
                            </>

                        )}
                        name="amount_cents"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Text>Title</Text>
                                <CustomTextInput
                                    placeholder="Title"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.title}
                                />
                            </>

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
                                <>
                                    <Text>Category</Text>
                                    <CustomDropDown
                                        placeholder="Category"
                                        value={value}
                                        searchable={true}
                                        items={categoryServices.mappedCategoryList}
                                        open={open}
                                        setOpen={setOpen}
                                        onSelectItem={(value: { value: any }) => {
                                            onChange(value.value)
                                        }}
                                        error={errors.category}
                                    />
                                </>

                            )
                        }}
                        name="category"
                    />
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
                            backgroundColor: COLORS.RED,
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