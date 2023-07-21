<template>
  <div class="user-group">
    <div class="user-group__avatar">
      <img :src="imageUrl" alt="User Avatar">
    </div>
    <div class="user-group__text">
      <div class="user-group__text__level">
        <h3>{{ main }}</h3>
        <template v-if="interpunct">
          <h4>·</h4>
          <p>{{ interpunct }}</p>
        </template>
      </div>
      <div v-if="desc" class="user-group__text__level">
        <p>{{ desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    main: {
      type: String,
      required: true
    },
    desc: {
      type: String
    },
    interpunct: {
      type: String
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.user-group {
  display: flex;
  align-items: center;
  object-fit: cover;
}

.user-group__text {
  margin-left: 10px;
}

.user-group__avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-group__username {
  margin-left: 14px;
  font-size: @font-size-small;
  font-weight: 400;
}

.user-group__text__level {
  display: flex;
  align-items: end;

  > * {
    margin-right: 10px;
  }
}
</style>
