<template>
  <b-container class="home">
    <b-alert v-model="showError" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <h1>Cat Browser</h1>
    <span>Breed</span>
    <b-col class="mt-3" md="3" sm="6"
      ><b-form-select
        @input="selectBreedHandler"
        :disabled="isDisableSelect"
        v-model="selectedBreedId"
        :options="breedOptions"
        class="mb-3"
        value-field="id"
        text-field="name"
    /></b-col>
    <div class="cat-box-container">
      <cat-box v-for="cat in cats" :key="cat.id" :cat="cat" />
    </div>
    <span v-if="isEmpty">No cats available. Please select another breed.</span>
    <b-button v-else class="mt-3" variant="success" @click="loadMoreHandler"
      >Load More</b-button
    >
  </b-container>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";
import CatBox from "@/components/CatBox.vue";
import CatDataService from "@/services/index";
import CatPreviewModel from "@/models/CatPreviewModel";
import { useRoute } from "vue-router";

const route = useRoute();
const breedQuery: string = route.query.breed?.toString().trim() ?? "none";
const selectedBreedId = ref(breedQuery);
const page = ref(1);
const limit = ref(10);
const breedOptions = ref<any[]>([]);
const cats = ref<CatPreviewModel[]>([]);
const isDisableSelect = ref<boolean>(false);
const showError = ref<boolean>(false);
const errorMessage = ref<string>("Error");

onBeforeMount(() => {
  getBreedSelection();
  getBreedFromQuery();
});

const isEmpty = computed(() => {
  return cats.value.length === 0;
});

const getBreedHandler = () => {
  CatDataService.getBreedById({
    id: selectedBreedId.value,
    page: page.value,
    limit: limit.value,
  })
    .then((response: any) => {
      const data: CatPreviewModel[] = response.data;
      cats.value = [...cats.value, ...data];
    })
    .catch((e: any) => {
      errorMessage.value = e;
      showError.value = true;
      setTimeout(() => {
        showError.value = false;
      }, 5000);
    });
};

// function for select
const selectBreedHandler = (value: string) => {
  if (value === "none") {
    cats.value = [];
    return;
  }
  cats.value = [];
  getBreedHandler();
};

// get Options values for Select
const getBreedSelection = () => {
  isDisableSelect.value = true;
  CatDataService.getAllBreeds()
    .then((response: any) => {
      breedOptions.value = response.data.map((cat: any) => {
        return {
          id: cat.id,
          name: cat.name,
        };
      });
      breedOptions.value = [
        { id: "none", name: "Select Breed" },
        ...breedOptions.value,
      ];
    })
    .finally(() => {
      isDisableSelect.value = false;
    });
};

// run if there is query params in URL
const getBreedFromQuery = () => {
  if (breedQuery === "") return;
  selectBreedHandler(breedQuery);
};

const loadMoreHandler = () => {
  page.value++;
  console.log("LOAD MORE HERE:", page.value);
  getBreedHandler();
};
</script>

<style>
.home {
  margin: 20px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.cat-box-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
