import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useRecipeStore = defineStore("recipeStore", () => {
  const recettes = ref([]);
  const recipe = ref({});

  const loadDataFromApi = async () => {
    try {
      const resp = await axios.get("http://localhost:3002/recipes");
      recettes.value = resp.data.map((recette) => ({
        ...recette,
        category: {
          name: recette.category_name || "Non définie",
        },
      }));
      console.log("Recettes chargées :", recettes.value);
    } catch (error) {
      recettes.value = [];
      console.error("Erreur lors du chargement des recettes :", error);
    }
  };

  const getRecipeById = async (id) => {
    try {
      const resp = await axios.get(`http://localhost:3002/recipes/${id}`);
      recipe.value = resp.data;
      return resp.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la recette :", error);
      return null;
    }
  };

  const addRecipeToAPI = async (newRecipe) => {
    try {
      const resp = await axios.post("http://localhost:3002/recipes", newRecipe);
      recettes.value.push(resp.data);
      console.log("Recette ajoutée :", resp.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la recette :", error);
    }
  };

  const deleteRecipeFromAPI = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3002/recipes/${recipeId}`);
      recettes.value = recettes.value.filter(
        (recette) => recette.id !== recipeId
      );
      console.log("Recette supprimée avec succès :", recipeId);
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette :", error);
    }
  };

  const validateRecipe = (recipe) => {
    return recipe && recipe.name && recipe.ingredients && recipe.instructions;
  };

  const editRecipe = async (updatedRecipe) => {
    try {
      console.log(
        "Modification de la recette avec les données :",
        updatedRecipe
      );
      const resp = await axios.put(
        `http://localhost:3002/recipes/${updatedRecipe.id}`,
        updatedRecipe
      );
      const index = recettes.value.findIndex((r) => r.id === updatedRecipe.id);
      if (index !== -1) {
        recettes.value[index] = resp.data;
        console.log("Recette modifiée :", resp.data);
      }
    } catch (error) {
      console.error("Erreur lors de la modification de la recette :", error);
    }
  };

  const getAllRecipes = () => {
    return recettes.value;
  };

  return {
    recettes,
    recipe,
    loadDataFromApi,
    getRecipeById,
    addRecipeToAPI,
    deleteRecipeFromAPI,
    editRecipe,
    getAllRecipes,
  };
});
