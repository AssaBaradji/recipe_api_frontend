<!-- 
<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import { useI18n } from "vue-i18n";
import { useRecipeStore } from "@store/recipeStore";

const { t } = useI18n();
const store = useRecipeStore();
const recettetModal = ref(null);
const route = useRouter();
const recipes = ref([]); 
const selectedRecipe = ref(null); 
const isLoading = ref(true); 

onMounted(async () => {
  try {
    await store.loadDataFromApi(); 
    if (store.recipes && store.recipes.length > 0) {
      recipes.value = store.recipes; 
      if (store.val !== null && store.val < recipes.value.length) {
        selectedRecipe.value = recipes.value[store.val]; 
      }
    }
  } catch (error) {
    console.error("Error loading recipes:", error);
  } finally {
    isLoading.value = false; 
  }

  const modalElement = recettetModal.value;
  const bootstrapModal = new Modal(modalElement);
  bootstrapModal.show(); 
});
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
              @click="route.push({ name: 'recette' })"
            ></button>
          </div>

          <div class="modal-body">
            <template v-if="isLoading">
              <p>Loading...</p>
            </template>
            <template v-else>
              <p v-if="selectedRecipe?.id">
                <span class="fw-bold">N° : </span>{{ selectedRecipe.id }}
              </p>
              <p v-if="selectedRecipe?.title">
                <span class="fw-bold">{{ t("recipes.view_form.champ_titre") }} : </span>{{ selectedRecipe.title }}
              </p>
              <p v-if="selectedRecipe?.type">
                <span class="fw-bold">{{ t("recipes.view_form.champ_type") }} : </span>{{ selectedRecipe.type }}
              </p>
              <div v-if="selectedRecipe?.ingredients">
                <table>
                  <thead>
                    <tr>
                      <th>{{ t("recipes.view_form.champ_ingredient") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(ingredient, index) in selectedRecipe.ingredients"
                      :key="index"
                    >
                      <td class="text-success">- {{ ingredient }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </div>

          <div class="modal-footer d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="route.push({ name: 'recette' })"
            >
              {{ t("recipes.view_form.button_close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



 -->

 <script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import { useI18n } from "vue-i18n";
import { useRecipeStore } from "@store/recipeStore";

const { t } = useI18n();
const store = useRecipeStore();
const recettetModal = ref(null);
const router = useRouter();
const route = useRoute(); // Pour récupérer l'ID de la recette dans l'URL
const selectedRecipe = ref(null); // Pour stocker les détails de la recette sélectionnée
const isLoading = ref(true); // Indicateur de chargement des données

// Récupérer l'ID de la recette à partir de l'URL
const recipeId = route.params.id;

onMounted(async () => {
  try {
    // Charger les détails de la recette en fonction de l'ID
    if (recipeId) {
      selectedRecipe.value = await store.getRecipeById(recipeId);
    }
  } catch (error) {
    console.error(
      "Erreur lors du chargement des détails de la recette:",
      error
    );
  } finally {
    isLoading.value = false; // Indicateur que le chargement est terminé
  }

  // Afficher le modal uniquement si une recette est sélectionnée
  if (selectedRecipe.value) {
    const modalElement = recettetModal.value;
    const bootstrapModal = new Modal(modalElement);
    bootstrapModal.show();
  }
});
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

              <p v-if="selectedRecipe?.category">
                <span class="fw-bold"
                  >{{ t("recipes.view_form.champ_categorie") }} : </span
                >{{ selectedRecipe.category }}
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
                  <li
                    v-for="(ingredient, index) in selectedRecipe.ingredient"
                    :key="index"
                    class="text-success"
                  >
                    {{ ingredient }}
                  </li>
                </ul>
              </div>

              <p v-else>
                <span class="fw-bold"
                  >{{ t("recipes.view_form.champ_ingredients") }} : </span
                >Aucun ingrédient disponible.
              </p>

              <p v-if="!selectedRecipe?.category">
                <span class="fw-bold"
                  >{{ t("recipes.view_form.champ_categorie") }} : </span
                >Catégorie non spécifiée.
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

