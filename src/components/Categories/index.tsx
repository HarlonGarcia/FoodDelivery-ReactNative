import { useState } from "react";
import { FlatList } from "react-native";
import { Category } from "../../types/Category";
import { Text } from "../Text";
import { CategoryContainer, Icon } from "./styles";

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSelectedCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? "" : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      data={categories}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <CategoryContainer
            onPress={() => handleSelectedCategory(category._id)}
          >
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>
            <Text size={14} weight="700" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
    />
  );
}
