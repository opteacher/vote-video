<template>
  <a-layout class="h-full flex flex-col">
    <a-layout-header class="bg-primary px-10">
      <h1 class="text-white">分局投票</h1>
    </a-layout-header>
    <a-layout-content class="flex-auto px-10 py-3 bg-transparent overflow-x-hidden overflow-y-auto">
      <slot />
    </a-layout-content>
    <a-layout-footer class="bg-footer px-10 text-white">Footer</a-layout-footer>
  </a-layout>
</template>
