import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, Content, InitalHeader, LoginButton } from "./styles";

interface HeaderProps {
  user: null | User;
  onLogout: () => void;
  onLoginClick: () => void;
}

export function Header({ user, onLogout, onLoginClick }: HeaderProps) {
  const isCartEmpty = (user?.orders?.length || 0) == 0;

  return (
    <Container>
      <InitalHeader>
        {isCartEmpty ? (
          <Content>
            <Text size={14} opacity={0.9}>
              Bem vindo(a) {user ? <Text weight="700">{user.name}</Text> : "ao"}
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
        {user ? (
          <TouchableOpacity onPress={onLogout}>
            <Text color="#FF5700" weight="700" size={18}>
              Deslogar
            </Text>
          </TouchableOpacity>
        ) : null}
      </InitalHeader>
    </Container>
  );
}
