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

<style scoped>
.tab-nav {
  margin-top: 30px;
  margin-left: 617px;
  padding: 22px 30px;
  display: flex;
  gap: 10px;
  border-radius: 10px;
}

.tab-nav__item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;
  padding: 0 20px;
  border-radius: 10px;
  border: 1px solid black;
  transition: background-color 0.2s;
  color: black;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.tab-nav__item.selected {
  background-color: #8554D8;
}

.tab-content {
  margin-top: 244px;
  margin-left: 625px;
  padding: 20px ;
  border-radius: 7px;
  background: #fff;
}
</style>
