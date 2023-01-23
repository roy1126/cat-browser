<template>
  <b-container class="cat-detail">
    <b-alert v-model="showError" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <div v-if="isLoading" class="loading">
      <img src="@/assets/loading-gif.gif" alt="loading-gif" />
    </div>
    <div v-else class="card">
      <b-card-header>
        <b-button @click="goBackHandler">Back</b-button>
      </b-card-header>
      <b-card-img
        class="cat-image"
        :src="cat?.url"
        :height="cat?.height"
        :width="cat?.width"
      />
      <div class="cat-info">
        <h4>{{ name }}</h4>
        <h5>Origin: {{ origin }}</h5>
        <h6>{{ temperament }}</h6>
        <p>{{ description }}</p>
      </div>
    </div>
  </b-container>
</template>

<script setup lang="ts">
import CatDetailModel from "@/models/CatDetailModel";
import { onBeforeMount, ref, computed } from "vue";
import CatDataService from "@/services/index";
import router from "@/router";

const cat = ref<CatDetailModel>();
const isLoading = ref<boolean>(false);
const showError = ref<boolean>(false);
const errorMessage = ref<string>("Error");

onBeforeMount(() => {
  const id = window.location.href.split("/").reverse()[0];
  isLoading.value = true;
  CatDataService.getCatDetailById(id)
    .then((response: any) => {
      cat.value = response.data as CatDetailModel;
    })
    .finally(() => {
      isLoading.value = false;
    })
    .catch((e: any) => {
      errorMessage.value = e;
      showError.value = true;
      setTimeout(() => {
        showError.value = false;
      }, 5000);
    });
});

const name = computed(() => {
  return cat.value?.breeds[0].name;
});
const origin = computed(() => {
  return cat.value?.breeds[0].origin;
});
const temperament = computed(() => {
  return cat.value?.breeds[0].temperament;
});
const description = computed(() => {
  return cat.value?.breeds[0].description;
});

const goBackHandler = () => {
  router.push({ path: "/", query: { breed: `${cat.value?.breeds[0].id}` } });
};
</script>

<style scoped>
.cat-image {
  object-fit: contain;
  max-width: 100%;
  max-height: 500px;
}
.cat-detail {
  padding: 20px;
}
.card {
  display: flex;
  align-items: flex-start;
}

.cat-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
