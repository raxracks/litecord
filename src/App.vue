<script setup lang="ts">
import ServerList from "./components/ServerList.vue";
import { data, showServerList, currentGuild } from "./state";
import DiscordGateway from "./gateway";
import SidePanel from "./components/SidePanel.vue";
import ServerListToggle from "./components/ServerListToggle.vue";
import DmsButton from "./components/DmsButton.vue";
import Separator from "./components/Separator.vue";
import PinnedServers from "./components/PinnedServers.vue";
import Server from "./components/Server.vue";
import ChannelList from "./components/ChannelList.vue";
const token = localStorage.getItem("token") ?? prompt("Enter your token") ?? "";
localStorage.setItem("token", token);
const gateway = new DiscordGateway(token);

gateway.on("READY", (readyData) => {
  console.log("Connected to Discord");
  data.value = readyData;
});
</script>

<template>
  <ServerList />

  <div class="app" @click="(event: any) => {
    if (!event.target.classList.contains('undismissable')) {
      showServerList = false;
    }
  }">
    <SidePanel>
      <DmsButton />
      <ServerListToggle />
      <Separator />
      <template v-if="currentGuild">
        <Server :guild="currentGuild" />
        <Separator />
      </template>
      <PinnedServers />
    </SidePanel>
    <ChannelList />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
