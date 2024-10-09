<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import { useI18n } from "vue-i18n";
import { useRecipeStore } from "@store/recipeStore";
import { useCategoryStore } from "@store/categoryStore";

const { t } = useI18n();
const store = useRecipeStore();
const categoryStore = useCategoryStore();
const recettetModal = ref(null);
const router = useRouter();
const route = useRoute();
const selectedRecipe = ref(null);
const isLoading = ref(true);

const recipeId = route.params.id;

onMounted(async () => {
  try {
    if (recipeId) {
      selectedRecipe.value = await store.getRecipeById(recipeId);
    }
  } catch (error) {
    console.error(
      "Erreur lors du chargement des détails de la recette:",
      error
    );
  } finally {
    isLoading.value = false;
  }

  if (selectedRecipe.value) {
    const modalElement = recettetModal.value;
    const bootstrapModal = new Modal(modalElement);
    bootstrapModal.show();
  }
  categoryStore.loadCategoriesFromAPI();
});

const getCategoryName = (categoryId) => {
  const category = categoryStore.categories.find(
    (cat) => cat.id === categoryId
  );
  return category ? category.name : "Catégorie non définie";
};
</script>

<template>
  <div class="container-fluid">
    <div
      class="modal fade"
      id="modalId"
      ref="recettetModal"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="false"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-center fw-bold" id="modalTitleId">
              {{ t("recipes.view_form.champ_detail") }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="router.push({ name: 'recette' })"
            ></button>
          </div>

          <div class="modal-body">
            <template v-if="isLoading">
              <p>Chargement...</p>
            </template>
            <template v-else>
              <p v-if="selectedRecipe?.id">
                <span class="fw-bold">N° : </span>{{ selectedRecipe.id }}
              </p>
              <p v-if="selectedRecipe?.title">
                <span class="fw-bold"
                  >{{ t("recipes.view_form.champ_titre") }} : </span
                >{{ selectedRecipe.title }}
              </p>
              <p v-if="selectedRecipe?.type">
                <span class="fw-bold"
                  >{{ t("recipes.view_form.champ_type") }} : </span
                >{{ selectedRecipe.type }}
              </p>

              <div
                v-if="
                  selectedRecipe?.ingredient &&
                  selectedRecipe.ingredient.length > 0
                "
              >
                <h5 class="fw-bold">
                  {{ t("recipes.view_form.champ_ingredient") }}
                </h5>
                <ul>
                  <li class="text-success">
                    {{ selectedRecipe.ingredient }}
                  </li>
                </ul>
              </div>

              <p v-else>
                <span class="fw-bold"
                  >{{ t("recipes.view_form.champ_ingredients") }} : </span
                >Aucun ingrédient disponible.
              </p>

              <p v-if="selectedRecipe?.category_id">
                <span class="fw-bold"
                  >{{ t("recipes.view_form.champ_categorie") }} : </span
                >{{ getCategoryName(selectedRecipe.category_id) }}
              </p>
            </template>
          </div>

          <div class="modal-footer d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="router.push({ name: 'recette' })"
            >
              {{ t("recipes.view_form.button_close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

