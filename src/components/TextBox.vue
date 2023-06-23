<script setup lang="ts">
import { ref } from 'vue';
import { currentChannel, token } from '../state';

const content = ref("");

function sendMessage(event: any) {
    event.preventDefault();
    fetch(`https://discord.com/api/v9/channels/${currentChannel.value.id}/messages`, {
        headers: {
            authorization: token.value,
            "content-type": "application/json",
        },
        body: JSON.stringify({ content: content.value }),
        method: "POST"
    });

    content.value = "";
}
</script>

<template>
    <form class="textbox" @submit="sendMessage">
        <input class="textinput" :value="content" @input="(event: any) => content = event.target.value" />
    </form>
</template>

<style scoped>
.textbox {
    margin: 0px 20px 20px 20px;
}

.textinput {
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    outline: 0;
    border: none;
    background-color: rgb(61, 61, 61);
}
</style>