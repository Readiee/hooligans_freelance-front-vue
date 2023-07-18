<template>
  <ul class="tabs-nav">
    <li
      v-for="tab in names"
      :key="tab.name"
      :class="[{'selected': tab.name === selectedTab.name}]"
      @click="clickOnTab(tab)"
    >{{ tab.label }}
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    names: {
      type: Array,
      required: true
    },
    selectedTab: {
      type: Object,
      required: false
    }
  },
  setup (props, { emit }) {
    const clickOnTab = (tab) => {
      emit('changeTab', tab)
    }

    return {
      clickOnTab
    }
  }
}

</script>

<style lang="less" scoped>
.tabs-nav {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  > li {
    width: fit-content;
    list-style-type: none;
    cursor: pointer;
    //margin-bottom: 30px;
    transition: 0.3s;

    &.selected {
      color: @secondary-color;
      font-weight: 700;
    }
  }
}
</style>
