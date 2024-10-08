<template>
  <div
    v-if="show"
    class="modal d-block"
    tabindex="-1"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ t("category.view_form.champ_titre") }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p><strong>ID:</strong> {{ category.id }}</p>
          <p>
            <strong>{{ t("category.view_form.champ_name") }}:</strong>
            {{ category.name }}
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            {{ t("category.view_form.champ_close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

watch(
  () => props.show,
  (newVal) => {
    if (!newVal) {
      emit("close");
    }
  }
);
</script>
  
  <style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  