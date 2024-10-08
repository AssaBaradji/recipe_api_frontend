<template>
  <div class="container mt-5">
    <div class="p-4 bg-light rounded shadow-sm">
      <h3>{{ t("category.editTitle") }}</h3>
      <form @submit.prevent="submitEditForm">
        <div class="input-group mb-4">
          <span class="input-group-text bg-warning text-dark fw-bold">
            <i class="fas fa-tag"></i>&nbsp;{{ t("category.editForm.name") }}
          </span>
          <input
            v-model="categoryName"
            id="categoryName"
            class="form-control"
            type="text"
            :placeholder="t('category.editForm.namePlaceholder')"
            required
          />
        </div>
        <button class="btn btn-warning w-100 fw-bold" type="submit">
          <i class="fas fa-save"></i> {{ t("category.editForm.save") }}
        </button>
        <button class="btn btn-secondary w-100 mt-2" @click="cancelEdit">
          <i class="fas fa-times"></i> {{ t("category.editForm.cancel") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCategoryStore } from "@/store/categoryStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const categoryStore = useCategoryStore();
const router = useRouter();
const route = useRoute();

const categoryId = route.params.id;
const categoryName = ref("");

onMounted(async () => {
  try {
    const category = await categoryStore.getCategoryById(categoryId);
    if (category) {
      categoryName.value = category.name;
    }
  } catch (error) {
    console.error("Failed to load category:", error);
  }
});

const submitEditForm = async () => {
  if (categoryName.value.trim()) {
    try {
      await categoryStore.updateCategory({
        id: categoryId,
        name: categoryName.value,
      });
      router.push({ name: "categorie" });
    } catch (error) {
      console.error("Échec de la mise à jour de la catégorie :", error);
    }
  }
};

const cancelEdit = () => {
  router.push({ name: "categorie" });
};
</script>

<style scoped>
</style>

