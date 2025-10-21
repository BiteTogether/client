import { useState } from "react";
import { Option } from "../../../types/feed"
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";

export const CheckboxGroup = ({
  options,
  value,
  onChange,
  maxSelect,
  label,
}: {
  options: Option[];
  value?: string | string[];
  onChange: (next: string | string[]) => void;
  maxSelect?: number;
  label?: string;
}) => {
  const [visible, setVisible] = useState(false);

  const isSelected = (val: string) => {
    if (Array.isArray(value)) return value.includes(val);
    return value === val;
  };

  const toggle = (val: string) => {
    if (maxSelect === 1) {
      const exists = !Array.isArray(value) && value === val;
      onChange(exists ? '' : val);
      setVisible(false);
      return;
    }

    const current = Array.isArray(value) ? value : [];
    const exists = current.includes(val);
    const next = exists ? current.filter((v) => v !== val) : [...current, val];
    if (maxSelect && next.length > maxSelect) return;
    onChange(next);
  };

  const getSelectedLabel = () => {
    if (Array.isArray(value)) {
      const selected = options.filter((opt) => value.includes(opt.value));
      return selected.map((s) => s.label).join(', ') || label;
    }
    const selected = options.find((opt) => opt.value === value);
    const suffix = "can reply & quote";
    return `${selected ? selected.label : label} ${suffix}`;
  };

  return (
    <>
      <TouchableOpacity style={styles.checkboxTrigger} onPress={() => setVisible(true)}>
        <Text style={styles.checkboxTriggerText}>{getSelectedLabel()}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.modalDone}>Close</Text>
              </TouchableOpacity>
            </View>

            {options.map((opt) => (
              <TouchableOpacity key={opt.value} style={styles.modalOption} onPress={() => toggle(opt.value)}>
                <View >
                  {isSelected(opt.value)}
                </View>
                <Text style={styles.checkboxOptionText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
    checkboxGroup: {
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkboxTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 0,
    flex: 1,
  },
  checkboxTriggerText: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  modalDone: {
    fontSize: 15,
    color: '#030303ff',
    fontWeight: '600',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  checkboxOptionText: {
    fontSize: 15,
    color: '#000',
  },
});