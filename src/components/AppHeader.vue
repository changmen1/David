<template>
  <v-card style="height: 100%;">
    <v-layout style="height: 100%;">
      <!--系统色 color="primary" 圆角 prominent -->
      <!-- https://source.unsplash.com/random/random" -->
      <!-- https://picsum.photos/1920/1080?random -->
      <v-app-bar class="titlebar" color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <v-app-bar-nav-icon class="titleClick" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>DAVID</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog max-width="800">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn class="titleClick" v-bind="activatorProps" text="文档" icon="mdi-help-circle"></v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="David">
              <template v-slot:text>
                author:zxl
                <br />
                version:0.0.1
                <br />
                Node.js:v20.11.1
                <br />
                Electron:29.2.0
                <br />
                Vue:3.4.21
                <br />
                Vuetify:3.5.8
                <br />
                Chromium:122.0.6261.139
                <br />
                OS:Windows_NT x64 10.0.19044
                <br />
                <br />
              </template>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="tonal" text="已知晓" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-btn icon>
          <v-icon class="titleClick" :icon="themIcon" size="small" @click="toggleTheme"></v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon class="titleClick" icon="mdi-cog-outline" size="small"></v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-container fluid>
                <v-checkbox v-model="top" label="置顶" @click="pinToTop"></v-checkbox>
                <v-checkbox v-model="selfStart" label="开机自启动"></v-checkbox>
              </v-container>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn icon>
          <v-icon class="titleClick" :icon="mdiMinus" size="small" @click="handleMdiMinus"></v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="titleClick" :icon="arrow" size="small" @click="handlemdiDockWindow"></v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="titleClick" :icon="mdiWindowClose" size="small" @click="handleClose"></v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="600">
          <v-card prepend-icon="mdi-walk" title="确认退出">
            <v-card-text>
              <v-radio-group v-model="exit">
                <v-radio label="最下化到系统托盘" value="one"></v-radio>
                <v-radio label="退出应用" value="two"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="取消" variant="tonal" @click="dialog = false"></v-btn>
              <v-btn text="确认" variant="tonal" @click="handleQuit"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
        <v-list v-model:opened="open">
          <v-list-item prepend-icon="mdi-home" title="主页" @click="gohome"></v-list-item>

          <v-list-group prepend-icon="mdi-home" value="Admin">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Admin"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon], i) in admins" :key="i" :prepend-icon="icon" :title="title"
              :value="title" @click="navigateToRoute(title)"></v-list-item>
          </v-list-group>

          <v-list-group prepend-icon="mdi-home" value="Actions">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Actions"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon], i) in cruds" :key="i" :prepend-icon="icon" :title="title"
              :value="title"></v-list-item>
          </v-list-group>

          <v-list-item prepend-icon="mdi-home" title="医生"></v-list-item>

          <v-list-group prepend-icon="mdi-home" value="docto">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="docto"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon], i) in doctor" :key="i" :prepend-icon="icon" :title="title"
              :value="title"></v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTheme } from "vuetify";
import { useRouter } from "vue-router";

const router = useRouter();
const drawer = ref(false);
const group = ref(null);
const theme = useTheme();
const themIcon = ref("mdi-white-balance-sunny");
const mdiMinus = ref(" mdi-minus");
const mdiWindowClose = ref(" mdi-window-close");
const dialog = ref(false);
const exit = ref("one");
const arrow = ref("mdi-arrow-expand-all");
const top = ref(false)
const selfStart = ref(false)

const open = ref(['Admin'])
const admins = ref([
  ['demo2', 'mdi-account-multiple-outline'],
  ['demo3', 'mdi-cog-outline'],
])
const cruds = ref([
  ['Create', 'mdi-plus-outline'],
  ['Read', 'mdi-file-outline'],
  ['Update', 'mdi-update'],
  ['Delete', 'mdi-delete'],
])
const doctor = ref([
  ['a', 'mdi-plus-outline'],
  ['b', 'mdi-file-outline'],
  ['c', 'mdi-update'],
  ['d', 'mdi-delete'],
])

watch(group, () => {
  drawer.value = false;
});

function toggleTheme() {
  themIcon.value =
    themIcon.value === "mdi-white-balance-sunny"
      ? "mdi-weather-night"
      : "mdi-white-balance-sunny";
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

function pinToTop() {
  window.electronAPI.PinToTop(top.value === false ? true : false);
}

function handleMdiMinus() {
  window.electronAPI.zoomOut();
}

function handlemdiDockWindow() {
  arrow.value =
    arrow.value === "mdi-arrow-expand-all"
      ? "mdi-arrow-collapse-all"
      : "mdi-arrow-expand-all";
  window.electronAPI.maximize();
}

function handleClose() {
  dialog.value = true;
}

function handleQuit() {
  if (exit.value === "one") {
    dialog.value = false;
    window.electronAPI.createTray();
  } else {
    window.electronAPI.closeWindow();
  }
}

const navigateToRoute = (route) => {
  // 根据路由参数进行相应的路由导航
  switch (route) {
    case 'demo2':
      router.push('/demo2');
      break;
    case 'demo3':
      router.push('/demo3');
      break;
    // 添加其他路由的情况
    default:
      break;
  }
};
// 跳转到home
const gohome = () => {
  router.push({
    path: "/",
  });
};
</script>

<style scoped>
.titlebar {
  -webkit-app-region: drag;
}

.titleClick {
  /* 使用标准属性 */
  -webkit-app-region: no-drag;
}
</style>
