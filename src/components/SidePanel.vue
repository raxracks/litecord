<template>
    <div class="side-panel">
        <slot />
    </div>
</template>

<style scoped>
.side-panel {
    display: flex;
    height: 100%;
    width: fit-content;
    overflow-y: scroll;
    flex-direction: column;
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-color: rgb(36, 36, 36);
    padding: 5px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 0 20px #181818;
    border-right: 1px solid #3f3f3f;
    align-items: center;
    z-index: 1;
}

.side-panel::-webkit-scrollbar {
    display: none;
}
</style>