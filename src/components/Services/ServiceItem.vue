<template>
  <div class="service-card">
    <div class="service-card__content">
      <div class="service-card__content__header">
        <div class="user-group">
          <img class="user-group__avatar" src="@/assets/images/rand_avatar.jpg" alt="User Avatar">
          <p class="user-group__username">{{ author.name }}</p>
        </div>
        <img class="" src="@/assets/images/more_details.svg"
             alt="More Service Details">
      </div>
      <p class="service-card__content__title">{{ service.title }}</p>
      <p class="service-card__content__desc">{{ service.description }}</p>
      <div class="service-card__content__cost">
        <p>{{ service.cost }} ₽</p>
      </div>
    </div>
    <app-primary-btn
      style="margin-top: auto;"
      @click="this.$router.push('/services/' + service.id)"
    >Подробнее
    </app-primary-btn>
  </div>
</template>

<script>
export default {
  name: 'service-item',
  components: {},
  props: {
    service: {
      type: Object,
      required: true
    },
    author: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.service-card {
  height: 285px;
  width: 270px;
  padding: 24px;
  border-radius: @border-radius;
  box-shadow: @box-shadow;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  * {
    cursor: default;
  }
  button{
    cursor: pointer;
  }
}

.service-card__content {
  > * {
    margin-top: 10px;
  }

  > :first-child {
    margin-top: 0;
  }
}

.service-card__content__header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.service-card__content__title {
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-card__content__desc {
  color: @non-active-color;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}

.service-card__content__cost {
  padding: 8px;
  max-width: 100%;
  width: fit-content;
  border-radius: @border-radius;
  border: 2px solid @secondary-color;
  background: rgba(133, 84, 216, 0.2);
  font-weight: 700;

  P {
    color: @secondary-color;
  }
}

.username {
  font-size: @font-size-small;
  font-weight: bold;
}
</style>
