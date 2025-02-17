import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
    scheduledExpenseData: ScheduledExpenseData
    deleteFunction: any
}

export interface ScheduledExpenseData {
    id: number,
    created_at: string,
    created_by: string,
    amount_cents: number,
    group_id: number,
    title: string,
    category: string,
    end_date: undefined | string
}

export default function ScheduledExpenseListItem({ scheduledExpenseData, deleteFunction }: Props) {
    const [collapse, setCollapse] = useState<boolean>(false)

    function onExpensePress() {
        console.log('Scheduled Expense Pressed')
        setCollapse(!collapse)
    }

    function onDeletePressed(id: number) {
        deleteFunction(id)
    }

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        touchable: {
            width: '100%'
        },
        baseButton: {
            padding: 10,
            paddingHorizontal: 10,
            width: '100%',
            backgroundColor: 'blue',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: collapse ? 0 : 10,
            borderBottomRightRadius: collapse ? 0 : 10
        },
        negativeButton: {
            backgroundColor: 'red'
        },
        positiveButton: {
            backgroundColor: 'lightblue',
        },
        buttonText: {
            textAlign: 'center',
            paddingHorizontal: 10
        },
        additionalDetails: {
            backgroundColor: 'white',
            padding: 10
        },
        deleteButton: {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: 'red',
            padding: 8
        },
        deleteButtonText: {
            textAlign: 'center',
            paddingHorizontal: 10,
            color: 'white',
        }
    });

    var StyledButton
    if (scheduledExpenseData.amount_cents > 0) {
        StyledButton = [styles.baseButton, styles.positiveButton]
    } else {
        StyledButton = [styles.baseButton, styles.negativeButton]
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onExpensePress} style={styles.touchable}>
                <View style={StyledButton}>
                    <Text style={styles.buttonText}>
                        {scheduledExpenseData.title}
                    </Text>
                    <Text style={styles.buttonText}>
                        ${(scheduledExpenseData.amount_cents / 100).toFixed(2)}
                    </Text>
                </View>
                {
                    collapse &&
                    <View>
                        <View style={styles.additionalDetails}>
                            <Text>
                                Created by: {scheduledExpenseData.created_by}
                            </Text>
                            <Text>
                                Created: {scheduledExpenseData.created_at}
                            </Text>
                            <Text>
                                Category: {scheduledExpenseData.category}
                            </Text>
                            <Text>
                                End Date: {scheduledExpenseData.end_date || "No End Date"}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => { onDeletePressed(scheduledExpenseData.id) }}>
                            <View style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>
                                    DELETE
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </TouchableOpacity >
        </View>
    )
}
