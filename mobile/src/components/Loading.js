import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { useTranslation } from 'react-i18next';


function Loading() {
  const { t } = useTranslation();
  return (
    <View style={styles.loading}>
      <ActivityIndicator
        style={{ marginTop: "80%" }}
        size="large"
        color="white"
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          marginTop: 10,
          color: "white",
        }}
      >
        {t('wait')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    backgroundColor: "rgba(10,10,10,0.5)",
    // top:"50%",
    width: "100%",
    height: "100%",
  },
});

export default Loading;
