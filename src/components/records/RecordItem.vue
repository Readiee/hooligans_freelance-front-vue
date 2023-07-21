<template>
  <div class="record-card">
    <div class="record-card__content">
      <div v-if="record.datetime" class="record-card__content__header">
        <h3>{{ stringToDate(record.datetime) }}</h3>
      </div>
      <p class="record-card__content__title">{{ record.product.title }}</p>
      <p class="record-card__content__desc">{{ record.product.description }}</p>
      <div class="record-card__content__cost">
        <p>{{ record.product.cost }} ₽</p>
      </div>
    </div>
    <AppPrimaryBtn
      @click="this.$router.push('/services/' + record.product.id)"
    >Подробнее
    </AppPrimaryBtn>
    <AppRedBtn
      style="margin-top: 15px;"
      @click="$emit('cancelRecord', this.record)"
    >Отменить
    </AppRedBtn>
  </div>
</template>

<script>
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import AppRedBtn from '@/components/UI/AppRedButton.vue'
import { getImageUrl } from '@/hooks/imageUrl'
import { dateToString } from '../../hooks/dateToString'

export default {
  name: 'record-item',
  methods: { stringToDate: dateToString },
  components: { AppRedBtn, AppPrimaryBtn },
  props: {
    record: {
      datetime: String,
      product: {
        places: String,
        duration: String,
        title: String,
        cost: String,
        description: String,
        author: {
          name: String,
          avatar: String
        },
        required: true
      }
    }
  },
  computed: {
    userImage () {
      return getImageUrl(this.record.product.author.avatar())
    }
  }
}
</script>

<style lang="less" scoped>
.record-card {
  height: fit-content;
  width: 300px;
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

.record-card__content {
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

.record-card__content__header {
  display: flex;
  align-items: start;

  h3 {
    //font-size: 18px;
  }
}

.record-card__content__title {
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.record-card__content__desc {
  height: 60px;
  color: @non-active-color;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.record-card__content__cost {
  margin-top: auto;
  padding: 8px;
  max-width: 100%;
  width: fit-content;
  border-radius: @border-radius;
  border: 2px solid @secondary-color;
  background: rgba(133, 84, 216, 0.2);
  font-weight: 700;

  p {
    color: @secondary-color;
  }
}
</style>
