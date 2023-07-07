<template>
  <div class="service-card">
    <div class="service-card__content">
      <div class="service-card__content__header">
        <div class="user-group" style="margin-right: 20px;">
          <div class="user-group__avatar">
            <img :src="userImage" alt="User Avatar">
          </div>
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
  },
  computed: {
    userImage (){
      const API_URL = 'http://localhost:3000'
      const newUrl = `${API_URL}${this.author.awatar.substr(1)}`
      console.log(newUrl)
      return newUrl
    }
  }
}
</script>

<style lang="less" scoped>
.service-card {
  height: 300px;
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
    margin-top: 15px;
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
