<template>
  <button @click="godemo">demo2</button>
  <v-file-input accept="image/*" label="File input"></v-file-input>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const godemo = () => {
  router.push({
    path: "/",
  });
};
</script>
