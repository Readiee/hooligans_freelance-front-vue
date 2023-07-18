<template>
  <div class="tab-content">
    <div class="content_title">
      <p>{{ category.label }}</p>
    </div>
    <div class="content_desc">
      <p>{{ category.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      name: String,
      label: String,
      description: String
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>

.tab-content {
  margin-top: 60px;
  width: 100%;
  height: fit-content;
  background: none;

  p {
    width: 70%;
    line-height: 1.5em;
  }

  .content_title{
    text-align: center;
    color: #010101;
    font-size: @font-size-extra-large;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    overflow: auto;
    justify-content: center;
    display: flex;
  }
  .content_desc{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    color: #010101;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    overflow: auto;
  }
}

</style>
