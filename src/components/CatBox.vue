<template>
  <b-col md="3" sm="6" cols="12">
    <b-card>
      <b-card-img top :src="cat.url" />
      <div class="cat-button">
        <b-button @click="viewDetailsHandler(cat.id)">View Details</b-button>
      </div>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import CatPreviewModel from "@/models/CatPreviewModel";
import router from "@/router";
const props = defineProps<{
  cat: CatPreviewModel;
}>();

const viewDetailsHandler = (id: string) => {
  router.push(`/cat-detail/${id}`);
};
</script>

<style scoped>
.cat-button {
  padding: 10px;
  display: flex;
  justify-content: center;
}
</style>
