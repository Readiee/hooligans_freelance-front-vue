<script setup>
defineProps({
  names: {
    type: Array,
    required: true
  },
  selectedTab: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['changeTab'])

const clickOnTab = (tabName) => {
  emit('changeTab', tabName)
}
</script>

<template>
  <div>
    <div class="tab-nav">
      <span
          v-for="tab in names"
          :key="tab.name"
          :class="['tab-nav__item', {'selected': tab.name === selectedTab}]"
          @click="clickOnTab(tab.name)"
      >
        {{tab.label}}
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-nav {
  display: flex;
  gap: 15px;
  border-radius: 10px;
}

.tab-nav__item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding:12px 20px;
  border-radius: 10px;
  outline: 1px solid black;
  outline-offset: -1px;
  transition: background-color 0.2s;
  color: black;
  font-size: @font-size-medium;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  gap: 10px;
}

.tab-nav__item.selected {
  background-color: @secondary-color;
  outline: none;
  color: white;
}
</style>
