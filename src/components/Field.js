import { View, Text, TextInput } from "react-native";
import { styles } from '../styles/fieldStyles';
import { colors } from "../styles/theme";

const Field = ({ lebel, hint, error, style, ...inputProps }) => {
    return(
        <View style={[styles.container, style]}>
            <Text style={styles.lebel}>{lebel}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholderTextColor={colors.dim}
                {...inputProps}
            />
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : hint ? (
                <Text style={styles.hintText}>{hint}</Text>
            ) : null}
        </View>
    )
}

export default Field;