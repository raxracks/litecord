<script setup lang="ts">
import ServerList from "./components/ServerList.vue";
import { data, showServerList, currentGuild, messages, currentChannel, token } from "./state";
import DiscordGateway from "./gateway";
import SidePanel from "./components/SidePanel.vue";
import ServerListToggle from "./components/ServerListToggle.vue";
import DmsButton from "./components/DmsButton.vue";
import Separator from "./components/Separator.vue";
import PinnedServers from "./components/PinnedServers.vue";
import Server from "./components/Server.vue";
import ChannelList from "./components/ChannelList.vue";
import MessageList from "./components/MessageList.vue";
import MainPanel from "./components/MainPanel.vue";
import TextBox from "./components/TextBox.vue";
token.value = localStorage.getItem("token") ?? prompt("Enter your token") ?? "";
localStorage.setItem("token", token.value);
const gateway = new DiscordGateway(token.value);

gateway.on("READY", (readyData) => {
  console.log("Connected to Discord");
  data.value = readyData;
});

gateway.on("MESSAGE_CREATE", (messageData) => {
  if (messageData.channel_id === currentChannel?.value?.id)
    messages.value.push(messageData);
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
    <MainPanel>
      <MessageList />
      <TextBox />
    </MainPanel>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
