<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">
      {{ t("category.table.titre_list") }}
    </h1>

    <div class="text-end mb-4">
      <button class="btn btn-warning fw-bold" @click="goToAddCategoryPage">
        <i class="fas fa-plus"></i> {{ t("category.table.Add_category") }}
      </button>
    </div>

    <div v-if="store.categories.length === 0" class="text-center">
      <p>{{ t("category.table.message_found") }}</p>
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{ t("category.table.name") }}</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in store.categories" :key="category.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ category.name }}</td>
          <td class="text-center">
            <button
              class="btn btn-sm btn-outline-primary me-2"
              @click="openDetailModal(category)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-secondary me-2"
              @click="goToEditCategoryPage(category.id)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="openConfirmationModal(category.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="showModal"
      class="modal d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ t("category.table.destroyconfirm") }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ t("category.table.destroyconfirm2") }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              {{ t("category.table.annuler") }}
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmDeleteCategory"
            >
              {{ t("category.table.delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showDetailModal"
      class="modal d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Détails de la catégorie</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeDetailModal"
            ></button>
          </div>
          <div class="modal-body">
            <p>Nom : {{ selectedCategory?.name }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeDetailModal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@/store/categoryStore";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useCategoryStore();
const router = useRouter();
const showModal = ref(false);
const showDetailModal = ref(false);
const selectedCategoryId = ref(null);
const selectedCategory = ref(null);

onMounted(() => {
  store.loadCategoriesFromAPI();
});

const goToAddCategoryPage = () => {
  router.push({ name: "category-add" });
};

const openConfirmationModal = (categoryId) => {
  selectedCategoryId.value = categoryId;
  showModal.value = true;
};

const goToEditCategoryPage = (categoryId) => {
  router.push({ name: "category-edit", params: { id: categoryId } });
};

const confirmDeleteCategory = async () => {
  if (selectedCategoryId.value) {
    await store.deleteCategory(selectedCategoryId.value);
    showModal.value = false;
    selectedCategoryId.value = null;
    await store.loadCategoriesFromAPI();
  }
};

const closeModal = () => {
  showModal.value = false;
  selectedCategoryId.value = null;
};

// Fonction pour ouvrir la modal de détails
const openDetailModal = (category) => {
  selectedCategory.value = category;
  showDetailModal.value = true;
};

// Fonction pour fermer la modal de détails
const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedCategory.value = null;
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

