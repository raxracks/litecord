import { ref } from "vue";

export const data = ref();
export const currentGuild = ref();
export const currentChannel = ref();
export const showServerList = ref(false);
export const pinned = ref<Set<any>>(new Set());
export const messages = ref<any[]>(new Array());
export const token = ref();