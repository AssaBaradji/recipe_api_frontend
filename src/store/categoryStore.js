import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);

  const loadCategoriesFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3002/categories");
      categories.value = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  const addCategory = async (category) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/categories",
        category
      );
      categories.value.push(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3002/categories/${categoryId}`);
      categories.value = categories.value.filter(
        (category) => category.id !== categoryId
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
    }
  };

  const getCategoryById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/categories/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la catégorie par ID:",
        error
      );
      return null;
    }
  };

  const updateCategory = async (category) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/categories/${category.id}`,
        category
      );
      const index = categories.value.findIndex((c) => c.id === category.id);
      if (index !== -1) {
        categories.value[index] = response.data;
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie:", error);
    }
  };

  return {
    categories,
    loadCategoriesFromAPI,
    addCategory,
    deleteCategory,
    getCategoryById,
    updateCategory,
  };
});
