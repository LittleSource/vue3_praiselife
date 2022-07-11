<template>
    <div>
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in bannerList">
                <img class="banner_img" :src="image.image" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="2" :border="false" :clickable="true">
            <van-grid-item v-for="item in hotServiceList" url="https://github.com">
                <van-image :src="item.icon_image" />
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { getBanner, getServiceList } from '@/api/index';
import { banner } from '@/api/index/types';
import { service } from '@/api/service/types';
const router = useRouter()
let bannerList = reactive<banner[]>([])
let hotServiceList = reactive<service[]>([])
getBanner().then(res => {
    res.bannerList.forEach(element => {
        return element.image = import.meta.env.VITE_CDN_URL + element.image
    });
    Object.assign(bannerList, res.bannerList)
    console.log(bannerList)
})
getServiceList().then(res => {
    res.hotList.forEach(element => {
        return element.icon_image = import.meta.env.VITE_CDN_URL + element.icon_image
    });
    Object.assign(hotServiceList, res.hotList)
})

const btnClick = () => {
    router.push('/about')
}

</script>

<style lang="scss" scoped>
.banner {
    &_img {
        width: 100%;
        height: 200px;
    }
}

:root {
    --van-grid-item-content-padding: 0px !important;
}
</style>