<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

// Router and active route setup
const router = useRouter();
const route = useRoute();
const activeRoute = ref(route.path);

// Function to set the active route when a link is clicked
const setActiveRoute = (path) => {
  activeRoute.value = path;
};

// i18n setup
const { locale } = useI18n();
const changeLanguage = (event) => {
  locale.value = event.target.value;
};
</script>

<template>
  <header class="container-fluid navbar navbar-expand-lg navbar-dark bg-warning">
    <nav class="container">
      <a
        class="navbar-brand d-flex align-items-center text-dark"
        @click="setActiveRoute('/home'); router.push({ name: 'home' })"
      >
        <i class="fas fa-utensils me-2"></i> {{ $t("recipes.App_page.titre") }}
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <button
              class="btn btn-outline-dark me-2"
              :class="{ active: activeRoute === '/recette' }"
              @click="setActiveRoute('/recette'); router.push({ name: 'recette' })"
            >
              {{ $t("recipes.App_page.menu") }}
            </button>
          </li>

          <li class="nav-item">
            <button
              class="btn btn-outline-dark me-2"
              :class="{ active: activeRoute === '/categorie' }"
              @click="setActiveRoute('/categorie'); router.push({ name: 'categorie' })"
            >
              {{ $t("recipes.App_page.menu2") }}
            </button>
          </li>

          <li class="nav-item">
            <select class="form-select" @change="changeLanguage">
              <option value="fr" selected>Français</option>
              <option value="en">English</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <div class="container mt-4">
    <router-view />
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}

select {
  border: none;
  background: transparent;
  color: black;
  font-size: 1rem;
}

.active {
  color: blue;
  font-weight: bold;
}
</style>
