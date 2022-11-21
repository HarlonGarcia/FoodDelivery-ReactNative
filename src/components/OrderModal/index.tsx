import { useState } from "react";
import { Modal, Platform, TouchableOpacity } from "react-native";
import { Address } from "../../types/Address";
import { Close } from "../Icons/Close";
import { Button } from "../Shared/Button";
import { Text } from "../Text";
import { Overlay, ModalBody, Header, Form, Input } from "./styles";

interface OrderModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
}

export function OrderModal({ visible, onClose, onSave }: OrderModalProps) {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [reference, setReference] = useState("");

  function handleSave() {
    setStreet("");
    setNumber("");
    setReference("");
    onSave({ street, number, reference });
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <Header>
            <Text weight="700">Informe o endereço de entrega</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder="Rua"
              placeholderTextColor="#666"
              onChangeText={setStreet}
            />
            <Input
              placeholder="Número"
              placeholderTextColor="#666"
              onChangeText={setNumber}
            />
            <Input
              placeholder="Referência"
              placeholderTextColor="#666"
              onChangeText={setReference}
              style={{ marginBottom: 24 }}
            />

            <Button
              onPress={handleSave}
              disabled={street.length === 0 && street.length === 0}
            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
