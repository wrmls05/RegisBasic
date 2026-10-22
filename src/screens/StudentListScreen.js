import { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, Alert, Pressable } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { listStudents, updateStudent, clearStudent } from "../db/database";
import Field from "../components/Field";
import { styles } from "../styles/studentListStyles";
export default function StudentListScreen({ reloadKey }) {
    const db = useSQLiteContext()
    const [rows, setRows] = useState([])
    const [editId, setEditId] = useState(null)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [saving, setSaving] = useState(false)

    const reload = useCallback(async () => {
        setRows(await listStudents(db))
    }, [db])
    useEffect(() => {
        reload()
    }, [reload, reloadKey])
    function startEdit(item) {
        setEditId(item.id)
        setName(item.name)
        setSurname(item.surname)
    }
    async function handleUpdate() {
        if (name.trim() === '' || surname.trim() === '') {
            Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกชื่อและนามสกุล')
            return
        }
        setSaving(true)
        try {
            const changes = await updateStudent(db, editId, name.trim(), surname.trim())
            if (changes === 0) {
                Alert.alert('ไม่ได้แก้ไข', 'ข้อมูลเหมือนเดิม หรือไม่พบรหัสนี้')
                return
            }
            await reload()
            setEditId(null)
            Alert.alert('สำเร็จ', `แก้ไข ${changes} รายการ`)
        } catch (e) {
            Alert.alert('ผิดพลาด', 'บันทึกไม่สำเร็จ กรุณาลองใหม่')
        } finally {
            setSaving(false)
        }
    }
    function handleClear() {
        Alert.alert('ล้างข้อมูลทั้งหมด', 'ลบผู้ลงทะเบียนทั้งหมดและกู้คืนไม่ได้', [
            { text: 'ยกเลิก', style: 'cancel' },
            {
                text: 'ล้าง',
                style: 'destructive',
                onPress: async () => {
                    const n = await clearStudent(db)
                    setEditId(null)
                    await reload()
                    Alert.alert('เสร็จแล้ว', `ลบไป ${n} รายการ`)
                }
            }
        ])
    }
    return (
        <FlatList
            data={rows}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.content}
            ListHeaderComponent={
                <Text style={styles.summary}>ลงทะเบียนแล้ว {rows.length} คน</Text>
            }
            renderItem={({item}) => (
                <View style={styles.card}>
                    <Text style={styles.cardName}>
                        {item.name} {item.surname}
                    </Text>
                    <Text style={styles.cardLine}>รหัสนิสิต {item.student_id}</Text>
                    <Text style={styles.cardLine}>ชื่อผู้ใช้ {item.username}</Text>
                    <Text style={styles.hashLabel}>
                        ค่าย่อยรหัสผ่าน {''}
                        <Text style={styles.hashValue}>
                            {item.hash_review}...
                        </Text>
                    </Text>
                    {editId === item.id ? (
                        <View>
                            <Field label="ชื่อ" value={name} onChangeText={setName} />
                            <Field label="นามสกุล" value={surname} onChangeText={setSurname} />
                            <Pressable onPress={handleUpdate} disabled={saving}>
                                <Text style={styles.hashValue}>{saving ? 'กำลังบันทึก...' : 'บันทึก'}</Text>
                            </Pressable>
                            <Pressable onPress={() => setEditId(null)} disabled={saving}>
                                <Text style={styles.cardLine}>ยกเลิก</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <Pressable onPress={() => startEdit(item)} disabled={saving}>
                            <Text style={styles.hashValue}>แก้ไขชื่อ–นามสกุล</Text>
                        </Pressable>
                    )}
                </View>
            )}
            ListEmptyComponent={
                <Text style={styles.empty}>ยังไม่มีผู้ลงทะเบียน</Text>
            }
            ListFooterComponent={rows.length > 0 ? (
                <Pressable style={styles.clearButton} onPress={handleClear} disabled={saving}>
                    <Text style={styles.clearText}>ล้างข้อมูลทั้งหมด</Text>
                </Pressable> 
                ) :null
            }
        />
    )
}