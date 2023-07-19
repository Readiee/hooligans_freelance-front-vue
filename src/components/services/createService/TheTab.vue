<template>
  <div class="container">
    <div class="card tab-block">
      <div class="tab-block__start">
        <h2>{{ info.title }}</h2>
        <p>{{ info.desc }}</p>
      </div>
      <div class="tab-block__end">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      title: {
        type: String
      },
      desc: {
        type: String
      }
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.tab-block {
  padding: 45px;
  width: 100%;
  justify-content: space-between;

  .tab-block__start{
    width: 30%;
    margin-right: 180px;
    p {
      margin-top: 10px;
      color: @non-active-color
    }
  }

  .tab-block__end {
    margin-left: auto;
    width: 100%;
  }

}
</style>
