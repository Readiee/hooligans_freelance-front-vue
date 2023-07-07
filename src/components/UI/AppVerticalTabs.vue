<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
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
          @click="clickOnTab(tab.name)">{{tab.label}}
      </span>
    </div>
    <div class="tab-content">
      <slot/>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-nav {
  margin-top: 97px;
  float: left;
  width: 30%;
  height: 300px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
}

.tab-nav__item {
  font-size: @font-size-medium;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: block;
  color: black;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
}

.tab-nav__item.selected {
  color: #8554D8;
}

.tab-content {
  margin-top: 97px;
  float: left;
  width: 70%;
  height: 300px;
}
</style>
