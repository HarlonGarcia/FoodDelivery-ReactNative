import { useState } from "react";
import { Modal, Platform, TouchableOpacity } from "react-native";
import { api } from "../../utils/api";
import { Close } from "../Icons/Close";
import { Button } from "../Shared/Button";
import { Text } from "../Text";
import { Input, ModalBody, ModalContent, ModalHeader, Overlay } from "./styles";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

export function LoginModal({ visible, onClose, onSubmit }: LoginModalProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit() {
    const payload = {
      phone,
      password,
    };

    api
      .post("/login", payload)
      .then(({ data }) => {
        setError(false);
        onSubmit(data);
        onClose();
      })
      .catch(() => setError(true));
  }

  function handleClose() {
    setPhone("");
    setPassword("");
    setError(false);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <ModalHeader>
            <Text>Cadastro</Text>
            <TouchableOpacity onPress={handleClose}>
              <Close color="#333" />
            </TouchableOpacity>
          </ModalHeader>

          <ModalContent>
            <Input
              placeholder="Seu telefone  -  Ex: (83) 90123-4567"
              placeholderTextColor="#666"
              onChangeText={(value) => {
                setError(false);
                setPhone(value);
              }}
            />
            <Input
              placeholder="Sua senha"
              placeholderTextColor="#666"
              onChangeText={(value) => {
                setError(false);
                setPassword(value);
              }}
              style={error ? { marginBottom: 8 } : { marginBottom: 24 }}
            />
            {error ? (
              <Text size={14} color="#f00" style={{ marginBottom: 24 }}>
                *Dados inválidos
              </Text>
            ) : null}
            <Button
              onPress={handleSubmit}
              disabled={phone.length === 0 || password.length === 0}
            >
              Entrar
            </Button>
          </ModalContent>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
