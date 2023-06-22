<script setup lang="ts">
import { pinned, currentGuild } from '../state';

function getIconURL(id: string, icon: string) {
    return `https://cdn.discordapp.com/icons/${id}/${icon}.png`;
}

defineProps<{ guild: any }>();
</script>

<template>
    <div @click="() => currentGuild = guild" @contextmenu="(event) => {
        event.preventDefault();
        if (pinned.has(guild)) pinned.delete(guild);
        else pinned.add(guild);
    }">
        <img v-if="guild.icon" :src="getIconURL(guild.id, guild.icon)"
            :class="{ icon: true, current: currentGuild === guild }" />
        <div v-else :class="{ icon: true, empty: true, current: currentGuild === guild }">
            {{
                guild.name
                    .split(/\s+/)
                    .map((e: string) => e[0])
                    .join("")
            }}
        </div>
    </div>
</template>

<style scoped>
.empty {
    background-color: rgb(43, 43, 43);
    display: flex;
    align-items: center;
    justify-content: center;
}

.current {
    outline: 3px solid #91bdff;
}
</style>
