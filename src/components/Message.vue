<script setup lang="ts">
defineProps<{ message: any }>();
</script>

<template>
    <div class="message">
        <div v-if="!message.grouped" class="username">
            {{ message.author.username }}
        </div>
        <div class="content">
            {{ message.content }}
        </div>
    </div>
</template>

<style scoped>
.message {
    margin: 0px 20px;
}

.username {
    margin-top: 10px;
    font-size: 18px;
    color: white;
}

.content {
    font-size: 16px;
    color: rgb(216, 216, 216);
}
</style>