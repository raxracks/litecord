<script setup lang="ts">
import { currentChannel, messages, token } from '../state';

const props = defineProps<{ channel: any }>();

function changeChannel() {
    currentChannel.value = props.channel;
    fetch(`https://discord.com/api/v9/channels/${props.channel.id}/messages?limit=50`, {
        headers: {
            authorization: token.value,
        }
    }).then(response => {
        response.json().then(json => {
            messages.value = json.reverse();
        });
    })
}
</script>

<template>
    <div :class="{ channel: true, selected: currentChannel === channel }" @click="changeChannel">
        # {{ channel.name }}
    </div>
</template>

<style scoped>
.channel {
    text-overflow: ellipsis;
    padding: 8px 20px;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    overflow-x: clip;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

.selected {
    border-left: 3px solid #7676ff;
    padding: 8px 17px;
    background: linear-gradient(90deg, #434343, transparent);
}
</style>