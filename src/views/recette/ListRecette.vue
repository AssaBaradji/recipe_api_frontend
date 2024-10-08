<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">
      {{ t("recipes.table.titleList") }}
    </h1>

    <div class="text-end mb-4">
      <button class="btn btn-warning fw-bold" @click="goToAddRecipePage">
        <i class="fas fa-plus"></i> {{ t("recipes.table.AddRecipe") }}
      </button>
    </div>

    <div v-if="recipeStore.recettes.length === 0" class="text-center">
      <p>{{ t("recipes.table.messageFound") }}.</p>
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{ t("recipes.table.tabtitle") }}</th>
          <th scope="col">{{ t("recipes.table.tabtype") }}</th>
          <th scope="col">{{ t("recipes.table.tabingredients") }}</th>
          <th scope="col">{{ t("recipes.table.tabcat") }}</th>
          <th scope="col">{{ t("recipes.table.tabaction") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(recette, index) in recipeStore.recettes" :key="recette.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ recette.title }}</td>
          <td>{{ recette.type }}</td>
          <td>{{ recette.ingredient }}</td>
          <td>{{ getCategoryName(recette.category_id) || "Non définie" }}</td>
          <td class="text-center">
            <button
              class="btn btn-sm btn-outline-primary me-2"
              @click="
                router.push({
                  name: 'recette-show',
                  params: { id: recette.id },
                });
                recipeStore.getRecipeById(recette.id);
              "
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-secondary me-2"
              @click="goToEditRecipePage(recette.id)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="openConfirmationModal(recette.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de confirmation -->
    <div
      v-if="showModal"
      class="modal d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ t("recipes.table.messagesup") }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ t("recipes.table.confirmessage") }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              {{ t("recipes.table.annuler") }}
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmDeleteRecipe"
            >
              {{ t("recipes.table.delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

const showModal = ref(false);
const selectedRecipeId = ref(null);

// Fonction pour obtenir le nom de la catégorie à partir de son ID
const getCategoryName = (categoryId) => {
  const category = categoryStore.categories.find(
    (cat) => cat.id === categoryId
  );
  return category ? category.name : null;
};

onMounted(() => {
  recipeStore.loadDataFromApi();
  categoryStore.loadCategoriesFromAPI(); // Chargement des catégories
});

const goToAddRecipePage = () => {
  router.push({ name: "recette-add" });
};

const goToEditRecipePage = (recipeId) => {
  router.push({ name: "recette-edit", params: { id: recipeId } });
};

const openConfirmationModal = (recipeId) => {
  selectedRecipeId.value = recipeId;
  showModal.value = true;
};

const confirmDeleteRecipe = async () => {
  if (selectedRecipeId.value) {
    await recipeStore.deleteRecipeFromAPI(selectedRecipeId.value);
    showModal.value = false;
    selectedRecipeId.value = null;
  }
};

const closeModal = () => {
  showModal.value = false;
  selectedRecipeId.value = null;
};
</script>
