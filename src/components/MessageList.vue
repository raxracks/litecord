<script setup lang="ts">
import Message from './Message.vue';
import { messages } from "../state";
import { onUpdated } from 'vue';
import { onBeforeUpdate } from 'vue';
let scrollNextUpdate = true;

onBeforeUpdate(() => {
    let scrollHeight: any = document.getElementById("message-list")?.scrollHeight;
    let offsetHeight: any = document.getElementById("message-list")?.offsetHeight
    scrollNextUpdate = document.getElementById("message-list")?.scrollTop === (scrollHeight - offsetHeight);
});

onUpdated(() => {
    if (scrollNextUpdate) {
        document.getElementById("message-list")?.scrollBy(0, 100000);
        scrollNextUpdate = true;
    }
});
</script>

<template>
    <div class="message-list" id="message-list">
        <Message
            v-for="message in messages.map((msg: any, i: number) => msg.author.id === messages[i - 1]?.author.id ? { ...msg, grouped: true } : msg)"
            :message="message" />
    </div>
</template>

<style scoped>
.message-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding-bottom: 10px;
}
</style>