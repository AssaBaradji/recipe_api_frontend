<script setup>
import { ref, onMounted } from "vue";
import { useRecipeStore } from "@store/recipeStore";
import { useCategoryStore } from "@store/categoryStore";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();
const router = useRouter();
const newRecipe = ref({ title: "", type: "", ingredient: "", categoryId: "" });

const recipeId = Number(router.currentRoute.value.params.id);

onMounted(async () => {
  if (recipeId) {
    const recette = await recipeStore.getRecipeById(recipeId);
    if (recette) {
      newRecipe.value = {
        title: recette.title,
        type: recette.type,
        ingredient: recette.ingredient,
        categoryId: recette.categoryId,
      };
    } else {
      console.error("Recette non trouvée pour l'ID :", recipeId);
    }
  }

  await categoryStore.loadCategoriesFromAPI();
});

const saveRecipe = async () => {
  if (
    !newRecipe.value.title ||
    !newRecipe.value.type ||
    !newRecipe.value.ingredient ||
    !newRecipe.value.categoryId
  ) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  try {
    await recipeStore.editRecipe({ ...newRecipe.value, id: recipeId });
    router.push({ name: "recette" });
  } catch (error) {
    console.error(
      "Erreur lors de la modification de la recette :",
      error.response?.data || error
    );
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="p-4 bg-light rounded shadow-sm">
      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-pen"></i>{{ t("recipes.edit_form.title") }}
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Titre de la recette"
          v-model="newRecipe.title"
        />
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-utensils"></i>&nbsp;{{ t("recipes.edit_form.type") }}
        </span>
        <select class="form-select" v-model="newRecipe.type">
          <option value="Entrée">
            {{ t("recipes.edit_form.option_Entrée") }}
          </option>
          <option value="Plat">{{ t("recipes.edit_form.option_plat") }}</option>
          <option value="Dessert">
            {{ t("recipes.edit_form.option_dessert") }}
          </option>
        </select>
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-carrot"></i>&nbsp;{{
            t("recipes.edit_form.ingredients")
          }}
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Liste des ingrédients (séparés par des virgules)"
          v-model="newRecipe.ingredient"
        />
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-tags"></i>&nbsp;{{
            t("recipes.edit_form.categorie")
          }}
        </span>
        <select class="form-select" v-model="newRecipe.categoryId">
          <option
            v-for="category in categoryStore.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <button class="btn btn-warning w-100 fw-bold" @click="saveRecipe">
        <i class="fas fa-save"></i> {{ t("recipes.edit_form.button") }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>


