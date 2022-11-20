import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { Container, OkButton } from "./styles";

interface OrderPlacedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderPlacedModal({ visible, onOk }: OrderPlacedModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text size={20} weight="700" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          Seu pedido já entrou na fila de espera!
        </Text>
        <OkButton onPress={onOk}>
          <Text weight="700" color="#FF5700">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
