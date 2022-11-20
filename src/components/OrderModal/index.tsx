import { useState } from "react";
import { Modal, Platform, TouchableOpacity } from "react-native";
import { Close } from "../Icons/Close";
import { Button } from "../Shared/Button";
import { Text } from "../Text";
import { Overlay, ModalBody, Header, Form, Input } from "./styles";

interface OrderModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (address: string) => void;
}

export function OrderModal({ visible, onClose, onSave }: OrderModalProps) {
  const [address, setAddress] = useState("");

  function handleSave() {
    setAddress("");
    onSave(address);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <Header>
            <Text weight="700">Seu pedido</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder="Informe o endereço de entrega"
              placeholderTextColor="#666"
              onChangeText={setAddress}
            />

            <Button onPress={handleSave} disabled={address.length === 0}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
