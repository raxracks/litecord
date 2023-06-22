<script setup lang="ts">
import { showServerList } from '../state';
</script>

<template>
    <div class="icon undismissable" @click="showServerList = !showServerList">
        <span class="material-symbols-rounded undismissable">grid_view</span>
    </div>
</template>
