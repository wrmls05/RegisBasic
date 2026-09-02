import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, ScrollView } from "react-native";
import { useSQLiteContext } from "../context/SQLiteContext";
import { styles } from "../styles/registerStyles";
import { colors } from "../styles/theme";

const RegisterScreen = () => {
    return (
        <View style={{flex: 1}}>
            <Text>Register Screen</Text>
        </View>
    )
}