import { Modal, Platform, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { Input, ModalBody, ModalContent, ModalHeader, Overlay } from "./styles";
import { Button } from "../Shared/Button";
import { api } from "../../utils/api";

interface SignUpModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

export function SignUpModal({ visible, onClose, onSubmit }: SignUpModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleClose() {
    setName("");
    setPhone("");
    setPassword("");
    setError("");
    setIsLoading(false);
    onClose();
  }

  async function handleSubmit() {
    setIsLoading(true);
    const formattedPhone = phone.replace(/[^+\d]+/g, "");

    if (formattedPhone.length < 11) {
      setError("Digite com DDD e com o dígito '9'");
      setIsLoading(false);
      return null;
    }

    const newUser = {
      _id: "",
      token: "",
      name,
      phone: formattedPhone,
      password,
      address: {
        street: "",
        number: "",
        reference: "",
      },
    };

    await api
      .get(`/users/${newUser.phone}`)
      .then(({ data }) => {
        if (data !== null) {
          setError("Um usuário com este número de telefone já existe!");
        } else {
          onSubmit(newUser);
          handleClose();
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <ModalHeader>
            <Text weight="700">Cadastro</Text>
            <TouchableOpacity onPress={handleClose}>
              <Close color="#333" />
            </TouchableOpacity>
          </ModalHeader>

          <ModalContent>
            <Input
              placeholder="Seu nome"
              placeholderTextColor="#666"
              onChangeText={(value) => {
                setName(value);
                setError("");
              }}
            />
            <Input
              placeholder="Seu telefone  |  ex: 83 9 1234-5678"
              placeholderTextColor="#666"
              onChangeText={(value) => {
                setPhone(value);
                setError("");
              }}
            />
            <Input
              placeholder="Sua senha"
              placeholderTextColor="#666"
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
              style={error ? { marginBottom: 8 } : { marginBottom: 24 }}
            />
            {error ? (
              <Text color="#F00" size={14} style={{ marginBottom: 24 }}>
                {error}
              </Text>
            ) : null}
            <Button
              onPress={handleSubmit}
              disabled={
                phone.length === 0 || password.length === 0 || name.length === 0
              }
              loading={isLoading}
            >
              Enviar
            </Button>
          </ModalContent>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
