import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import {
  Container,
  Content,
  InitalHeader,
  LoginButton,
  OrderHeader,
  OrderPlaced,
} from "./styles";

interface HeaderProps {
  user: null | User;
  onCancelOrder: () => void;
  onLoginClick: () => void;
}

export function Header({ user, onCancelOrder, onLoginClick }: HeaderProps) {
  const isCartEmpty = (user?.orders.length || 0) == 0;

  // number.toString().replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")

  // Botão de deslogar

  // Opção de registrar caso não tenha login

  return (
    <Container>
      <InitalHeader>
        {isCartEmpty ? (
          <Content>
            <Text size={14} opacity={0.9}>
              Bem vindo(a) ao
            </Text>
            <Text size={24} weight="900">
              Food
              <Text size={24}>Delivery</Text>
            </Text>
          </Content>
        ) : null}
        {!user ? (
          <LoginButton onPress={onLoginClick}>
            <Text color="#fff" weight="700" size={14}>
              Fazer login
            </Text>
          </LoginButton>
        ) : null}
      </InitalHeader>

      {user && user.orders.length > 0 ? (
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
      ) : null}
    </Container>
  );
}
