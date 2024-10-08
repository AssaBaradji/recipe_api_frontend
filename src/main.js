import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/css/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@router";
import App from "./App.vue";
import CustomButton from "@/components/CustomButton.vue";
import { createI18n } from "vue-i18n";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

library.add(fas, fab, far);

const messages = {
  en: {
    recipes: {
      title: "My Recipes",
      noRecipes: "No Recipes Saved",
      addNew: "New Recipe",
      table: {
        titleList: "Recipes Of List",
        AddRecipe: "Add New Recipe",
        messageFound: "No Recipe Found",
        number: "No.",
        title: "Title",
        type: "Type",
        category: "Category",
        actions: "Actions",
        ingredients: "Ingredients",
        confirmDelete:
          "Are you sure you want to delete the recipe {recipeTitle}?",
        tabtitle: "title",
        tabtype: "type",
        tabingredients: "ingredient",
        tabcat: "category",
        tabaction: "Actions",
        messagesup: "Confirm delete",
        confirmessage: "are sure to delete this category ?",
        annuler: "Cancel",
        delete: "Delete",
      },
      buttons: {
        view: "View",
        edit: "Edit",
        delete: "Delete",
      },
      addForm: {
        title: "Add a New Recipe",
        recipeTitle: "Title",
        recipeTitlePlaceholder: "Enter the recipe title",
        recipeType: "Type",
        ingredients: "Ingredients",
        ingredientsPlaceholder: "List of ingredients",
        save: "Save Recipe",
        category: "category",
        selectCategory: "Select category",
      },
      App_page: {
        titre: "DeliceKitchen",
        menu: "Recipes",
        menu2: "Category",
      },

      home_page: {
        acceuil: "Welcom to Delice kitchen !",
        paragraphe: "The tast of it",
        paragraphe2: "Your recipes, your cooking, your passion.",
      },
      edit_form: {
        champ_titre: "Title",
        champ_ingredient: "Ingredient",
        champ_type: "Type",
        button_add: "Save",
        title: "title",
        type: "type",
        option_Entrée: "Starter",
        option_plat: "Main courses",
        option_dessert: "Dessert",
        ingredients: "Ingredients",
        categorie: "Category",
        button: "Save",
      },
      view_form: {
        champ_detail: "Recipe details",
        champ_titre: "Title",
        champ_type: "type",
        champ_ingredient: "Ingredient",
        button_close: "Close",
        champ_categorie: "category",
      },
      addNew: {
        title: "Add New Category",
      },
    },
    category: {
      editTitle: "Edit Category",
      table: {
        titre_list: "Category Of List",
        Add_category: "Add Category",
        message_found: "No Category Found.",
        name: "Name",
        destroyconfirm: "Confirm Delete",
        destroyconfirm2: "are you sure you would like delete this category ?",
        annuler: "Cancel",
        delete: "Delete",
        editTitle: "Modifier la catégorie",
      },
      title: "Category Manager",
      Added: "Add Category",
      name: "Name",
      actions: "Actions",
      message: "No Categories Found",
      editCategory: "Edit Category",
      addCategory: "Add Category",
      add: "Add",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      nameLabel: "Category Name",
      namePlaceholder: "Enter category name",
      addForm_category: {
        formtitle: "Add New Category",
        formName: "Category Name",
        namePlaceholder: "Enter category name",
        save: "Save category",
        formbutton: "Edit",
        buttonCancel: "Cancel",
      },
      editForm: {
        name: "Category Name",
        save: "save",
        cancel: "cancel",
      },
      view_form: {
        champ_titre: "Category Details",
        champ_name: "Category Name",
        champ_close: "Close",
      },
    },
  },
  fr: {
    recipes: {
      title: "Mes Recettes",
      noRecipes: "Aucune Recette Enregistrée",
      addNew: "Nouvelle Recette",
      table: {
        titleList: "Liste des Recettes",
        AddRecipe: "Ajouter une Recette",
        messageFound: "Aucune recette trouvée",
        number: "N°",
        title: "Titres",
        type: "Type",
        category: "Categorie",
        actions: "Actions",
        ingredients: "Ingredients",
        confirmDelete:
          "Vous êtes sûr de vouloir supprimer la recette {recipeTitle} ?",
        tabtitle: "titre",
        tabtype: "type",
        tabingredients: "ingrédients",
        tabcat: "categories",
        tabaction: "Actions",
        messagesup: "Confirmer la suppression",
        confirmessage: "Êtes-vous sûr de vouloir supprimer cette recette ?",
        annuler: "Annuler",
        delete: "Supprimer",
      },
      buttons: {
        view: "Voir",
        edit: "Modifier",
        delete: "Supprimer",
      },
      addForm: {
        title: "Ajouter une Nouvelle Recette",
        recipeTitle: "Titre",
        recipeTitlePlaceholder: "Entrez le titre de la recette",
        recipeType: "Type",
        ingredients: "Ingrédients",
        ingredientsPlaceholder: "Liste des ingrédients",
        save: "Enregistrer la Recette",
        category: "catégorie",
        selectCategory: "Selectionnez une categorie",
      },
      App_page: {
        titre: "cuisineDelice",
        menu: "Recette",
        menu2: "Catégorie",
      },
      home_page: {
        acceuil: "Bienvenu Dans la cuisine Delice !",
        paragraphe: "Le gout de ça",
        paragraphe2: "Vos recettes, votre cuisine, votre passion.",
      },
      edit_form: {
        champ_titre: "Titre",
        champ_ingredient: "Ingrédient",
        champ_type: "Type",
        button_add: "Enregistrer",
        title: "titre",
        type: "type",
        option_Entrée: "Entrée",
        option_plat: "Plat Principale",
        option_dessert: "Dessert",
        ingredients: "Ingrédients",
        categorie: "Catégorie",
        button: "Sauvager",
      },
      view_form: {
        champ_detail: "Détail du recette",
        champ_titre: "Titre",
        champ_type: "type",
        champ_ingredient: "Ingrédient",
        button_close: "Fermer",
        champ_categorie: "categorie",
      },
      addNew: {
        title: "Ajouter Une Nouvelle Recette",
      },
    },
    category: {
      editTitle: "Modifier la catégorie",
      table: {
        titre_list: "Liste des Catégories",
        Add_category: "Ajouter une catégorie",
        message_found: "Aucune catégorie trouvée.",
        name: "Name",
        destroyconfirm: "Confirmer la suppression",
        destroyconfirm2:
          "Êtes-vous sûr de vouloir supprimer cette catégorie  ?",
        annuler: "Annuler",
        delete: "Supprimer",
        editTitle: "Modifier la catégorie",
      },
      title: "Gestion des Catégories",
      Added: "Ajouter une Catégorie",
      name: "Nom",
      actions: "Actions",
      message: "Aucune catégorie disponible.",
      editCategory: "Modifier la Catégorie",
      addCategory: "Ajouter une Catégorie",
      saveChanges: "Enregistrer les Modifications",
      add: "Ajouter",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      view: "Voir",
      nameLabel: "Nom de la Catégorie",
      namePlaceholder: "Entrez le nom de la catégorie",
      addForm_category: {
        formtitle: "Ajouter une nouvelle catégorie",
        formName: "Nom de la catégorie",
        namePlaceholder: "Entrez le nom de la categorie",
        save: "Enregistrer",
        formbutton: "Modifier",
        buttonCancel: "Annuler",
      },
      editForm: {
        name: "Nom de Catégorie",
        save: "Enregistrer la Catégorie",
        cancel: "Annuler",
      },
      view_form: {
        champ_titre: "Détails de la Catégorie",
        champ_name: "Nom de la catégorie",
        champ_close: "Fermer",
      },
    },
  },
};

const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "en",
  messages,
});

const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("CustomBtn", CustomButton);

app.use(i18n);
app.use(pinia);
app.use(router);

app.mount("#app");
