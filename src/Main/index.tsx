import { useState } from "react";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { OrderModal } from "../components/OrderModal";
import { Button } from "../components/Shared/Button";
import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from "./styles";

export function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  function handleSaveAddress(address: string) {
    setSelectedAddress(address);
  }

  function handleCancelOrder() {
    setSelectedAddress("");
  }

  return (
    <>
      <Container>
        <Header
          selectedAddress={selectedAddress}
          onCancelOrder={handleCancelOrder}
        />
        <CategoriesContainer>
          <Categories></Categories>
        </CategoriesContainer>
        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedAddress && (
            <Button onPress={() => setIsModalVisible(true)}>Novo pedido</Button>
          )}
        </FooterContainer>
      </Footer>

      <OrderModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveAddress}
      />
    </>
  );
}
