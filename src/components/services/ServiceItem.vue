<template>
  <div class="service-card">
    <div class="service-card__content">
      <div v-if="service.author" class="service-card__content__header">
        <div class="user-group"
             style="margin-right: 20px;">
          <div class="user-group__avatar">
            <img :src="userImage" alt="User Avatar">
          </div>
          <p class="user-group__username">{{ service.author.name }}</p>
        </div>
<!--        <img class="" src="@/assets/images/more_details.svg"-->
<!--             alt="More Service Details">-->
      </div>
      <p class="service-card__content__title">{{ service.title }}</p>
      <p class="service-card__content__desc">{{ service.description }}</p>
      <div class="service-card__content__cost">
        <p>{{ service.cost }} ₽</p>
      </div>
    </div>
    <AppPrimaryBtn
      style="margin-top: auto;"
      @click="this.$router.push('/services/' + service.id)"
    >Подробнее
    </AppPrimaryBtn>
  </div>
</template>

<script>
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'

export default {
  name: 'service-item',
  components: { AppPrimaryBtn },
  props: {
    service: {
      id: Number,
      image: String,
      createdAt: String,
      updatedAt: String,
      places: String,
      category: String,
      duration: String,
      title: String,
      cost: String,
      description: String,
      authorId: Number,
      isPublished: Boolean,
      author: {
        name: String,
        awatar: String
      },
      required: true
    }
  },
  computed: {
    userImage () {
      const API_URL = 'http://localhost:3000'
      return `${API_URL}${this.service.author.awatar.substr(1)}`
    }
  }
}
</script>

<style lang="less" scoped>
.service-card {
  height: fit-content;
  width: 270px;
  padding: 24px;
  border-radius: @border-radius;
  box-shadow: 1px 1px 37px 1px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  * {
    cursor: default;
  }

  button {
    cursor: pointer;
  }
}

.service-card__content {
  display: flex;
  flex-direction: column;
  height: 100%;

  > * {
    margin-bottom: 15px;
  }

  > :last-child {
    //margin-bottom: 0;
  }
}

.service-card__content__header {
  display: flex;
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
  height: 60px;
  color: @non-active-color;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.service-card__content__cost {
  margin-top: auto;
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
