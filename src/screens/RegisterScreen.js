import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, ScrollView, Pressable, } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { styles } from "../styles/registerStyles";
import { colors } from "../styles/theme";

const RegisterScreen = () => {
    return (
        <View style={{flex: 1}}>
            <Text style={styles.intro}>กรุณากรอกข้อมูลให้ครบทุกช่อง</Text>

            <View style={styles.row}>
                <Field 
                    style={styles.half}
                    label="ชื่อ"
                    placeholder="สมชาย"
                />
                <Field 
                    style={styles.half}
                    label="นามสกุล"
                    placeholder="เข็มกัด"
                />
            </View>
            <Field
                label='รหัสนิสิต'
                placeholder='6721651785'
                keyboardType='number-pad'
                maxLength={10}
            />
            <Field
                label='ชื่อผู้ใช้'
                placeholder='somchai'
                hint='ห้ามซ้ำกับผู้ใช้อื่น'
                autoCapitalize='none'
                maxLength={20}
            />
            <Field
                label='รหัสผ่าน'
                hint='อย่างน้อย 8 ตัว มีทั้งตัวอักษรและตัวเลข'
                placeholder='อย่างน้อย 8 ตัว มีทั้งตัวอักษรและตัวเลข'
                secureTextEntry
                autoCapitalize='none'
            />
            <Field
                label='ยืนยันรหัสผ่าน'
                placeholder='ยืนยันรหัสผ่าน'
                secureTextEntry
                autoCapitalize='none'
            />

            <Pressable style={styles.submit}>
                <Text style={styles.submitText}>ลงทะเบียน</Text>
            </Pressable>
        </View>
    )
}