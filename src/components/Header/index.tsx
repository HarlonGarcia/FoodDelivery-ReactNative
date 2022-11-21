import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, Content, OrderHeader, OrderPlaced } from "./styles";

interface HeaderProps {
  user: null | User;
  onCancelOrder: () => void;
}

export function Header({ user, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!user && (
        <>
          <Text size={14} opacity={0.9}>
            Bem vindo(a) ao
          </Text>
          <Text size={24} weight="900">
            Food
            <Text size={24}>Delivery</Text>
          </Text>
        </>
      )}
      {user && (
        <Content>
          <OrderHeader>
            <Text size={24} weight="700">
              Pedido
            </Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text size={14} weight="700" color="#E20000">
                Cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>
          <OrderPlaced>
            <Text color="#666">{user.name}</Text>
          </OrderPlaced>
        </Content>
      )}
    </Container>
  );
}
