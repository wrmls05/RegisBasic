import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, ScrollView, Pressable, KeyboardAvoidingView, } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { styles } from "../styles/registerStyles";
import { colors } from "../styles/theme";
import Field from "../components/Field";
import { validateForm, hasErrors } from "../utils/validate";
import { registerStudent } from "../db/database";

const EMPTY_FORM = {
    name: '',
    surname: '',
    studentId: '',
    username: '',
    password: '',
    confirm: '',
}

const RegisterScreen = ({onRegistered}) => {
    const db = useSQLiteContext();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');

    function setField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }))

        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev }
                delete next[field]
                return next
            })
        }
    }

    async function handleSubmit() {
        console.log('กด Submit แล้ว', form)

        const found = validateForm(form)
        if(hasErrors(found)) {
            setErrors(found)
            return
        }

        console.log('ไม่มี error ปรากฏ พร้อมบันทึก', form)

        setSaving(true)

        const result = await registerStudent(db, {
            name: form.name.trim(),
            surname: form.surname.trim(),
            studentId: form.studentId.trim(),
            username: form.username.trim(),
            password: form.password
        })

        setSaving(false)

        if(!result.ok){
            if(result.field) setErrors({ [result.field]: result.message })
            else Alert.alert('ผิดพลาด', result.message)
            return
        }

        setForm(EMPTY_FORM)
        setErrors({})
        setSuccess(`ลงทะเบียนสำเร็จ หมายเลขในระบบคือ ${result.id}`)
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps='handled'
            >
                <Text style={styles.intro}>กรุณากรอกข้อมูลให้ครบทุกช่อง</Text>

                {success !== '' && (
                    <View style={styles.notice}>
                        <Text style={styles.noticeText}>{success}</Text>
                    </View>
                )}

                <View style={styles.row}>
                    <Field
                        style={styles.half}
                        label="ชื่อ"
                        placeholder="สมชาย"
                        value={form.name}
                        onChangeText={(v) => setField('name', v)}
                        error={errors.name}
                    />
                    <Field
                        style={styles.half}
                        label="นามสกุล"
                        placeholder="เข็มกัด"
                        value={form.surname}
                        onChangeText={(v) => setField('surname', v)}
                        error={errors.surname}
                    />
                </View>
                <Field
                    label='รหัสนิสิต'
                    placeholder='6721651785'
                    keyboardType='number-pad'
                    maxLength={10}
                    value={form.studentId}
                    onChangeText={(v) => setField('studentId', v)}
                    error={errors.studentId}
                />
                <Field
                    label='ชื่อผู้ใช้'
                    placeholder='somchai'
                    hint='ห้ามซ้ำกับผู้ใช้อื่น'
                    autoCapitalize='none'
                    maxLength={20}
                    value={form.username}
                    onChangeText={(v) => setField('username', v)}
                    error={errors.username}
                />
                <Field
                    label='รหัสผ่าน'
                    hint='อย่างน้อย 8 ตัว มีทั้งตัวอักษรและตัวเลข'
                    placeholder='อย่างน้อย 8 ตัว'
                    secureTextEntry
                    autoCapitalize='none'
                    value={form.password}
                    onChangeText={(v) => setField('password', v)}
                    error={errors.password}
                />
                <Field
                    label='ยืนยันรหัสผ่าน'
                    placeholder='ยืนยันรหัสผ่าน'
                    secureTextEntry
                    autoCapitalize='none'
                    value={form.confirm}
                    onChangeText={(v) => setField('confirm', v)}
                    error={errors.confirm}
                />

                <Pressable
                    style={[styles.submit, saving && styles.submitDisabled]}
                    onPress={handleSubmit}
                    disabled={saving}
                >
                    <Text style={styles.submitText}>{saving ? 'กำลังลงบันทึก...' : 'ลงทะเบียน'}</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen;