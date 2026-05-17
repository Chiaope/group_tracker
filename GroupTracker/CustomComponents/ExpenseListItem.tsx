import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ExpenseData } from "@/Services/ExpenseServices";
import isoToDateTimeString from "@/Utils/isoToDateTimeString";
import B from "@/Utils/B";

interface Props {
    expenseData: ExpenseData
    deleteFunction: any
}

export default function ExpenseListItem({ expenseData, deleteFunction }: Props) {
    const [collapse, setCollapse] = useState<boolean>(false)

    function onExpensePress() {
        console.log('Expense Pressed')
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
            width: '100%',
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
            backgroundColor: 'green',
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
    if (expenseData.amount_cents > 0) {
        StyledButton = [styles.baseButton, styles.positiveButton]
    } else {
        StyledButton = [styles.baseButton, styles.negativeButton]
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onExpensePress} style={styles.touchable}>
                <View style={StyledButton}>
                    <Text style={styles.buttonText}>
                        {expenseData.title}
                    </Text>
                    <Text style={styles.buttonText}>
                        ${(expenseData.amount_cents / 100).toFixed(2)}
                    </Text>
                </View>
                {
                    collapse &&
                    <View>
                        <View style={styles.additionalDetails}>
                            <Text>
                                <B>Title:</B> {expenseData.title}
                            </Text>
                            <Text>
                                <B>Amount:</B> ${(expenseData.amount_cents / 100).toFixed(2)}
                            </Text>
                            <Text>
                                <B>Created by:</B> {expenseData.username}
                            </Text>
                            <Text>
                                <B>Created at:</B> {isoToDateTimeString(expenseData.created_at)}
                            </Text>
                            <Text>
                                <B>Category:</B> {expenseData.category}
                            </Text>
                            <Text>
                                <B>Description:</B> {expenseData.description || "No Descriptions"}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => { onDeletePressed(expenseData.id) }}>
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
