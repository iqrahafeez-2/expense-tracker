import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);

  const addExpense = () => {
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    if (!category) {
      setError("Please select a category");
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);

    setTitle("");
    setAmount("");
    setCategory("");
    setError("");
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const total = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Food":
        return "green";
      case "Transport":
        return "blue";
      case "Utilities":
        return "orange";
      case "Entertainment":
        return "purple";
      default:
        return "gray";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Expenses</Text>

      <TextInput
        placeholder="Expense Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Utilities" value="Utilities" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={addExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseTitle}>
                {item.title}
              </Text>

              <Text>
                PKR {item.amount.toLocaleString()}
              </Text>

              <Text
                style={[
                  styles.categoryBadge,
                  {
                    backgroundColor: getCategoryColor(
                      item.category
                    ),
                  },
                ]}
              >
                {item.category}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteExpense(item.id)}
            >
              <Text style={styles.delete}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>
        Total: PKR {total.toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },

  picker: {
    height: 50,
    width: "100%",
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "red",
    marginBottom: 10,
    fontWeight: "bold",
  },

  expenseItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },

  expenseTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  categoryBadge: {
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 4,
    borderRadius: 5,
    alignSelf: "flex-start",
  },

  delete: {
    color: "red",
    fontWeight: "bold",
  },

  total: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#007AFF",
  },
});