<template>
  <div class="not-found">
    <h2>Sorry page is not found.</h2>
    <b-button @click="navigateToHome">Home</b-button>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

const navigateToHome = () => {
  router.push("/");
};
</script>

<style>
.not-found {
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
