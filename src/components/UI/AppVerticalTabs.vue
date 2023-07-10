<template>
  <ul class="tabs-nav">
    <li
      v-for="tab in names"
      :key="tab.name"
      :class="[{'selected': tab.name === selectedTab}]"
      @click="clickOnTab(tab.name)"
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
      type: String,
      required: false
    }
  },
  setup (props, { emit }) {
    const clickOnTab = (tabName) => {
      emit('changeTab', tabName)
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
