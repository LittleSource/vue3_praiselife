<template>
    <div class="container">
        <div>
            {{ userName }}
        </div>
        <div class="slider">
            <div ref="scene_box"></div>
            <el-slider v-model="slider" :step="0.01" :max="1" />
        </div>
        <el-button type="primary" @click="setUser">按钮</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as THREE from "three";
import { useUserStore } from '../store';
import { storeToRefs } from 'pinia';
export default defineComponent({
    setup() {
        const scene_box = ref<HTMLElement | null>(null)
        const slider = ref<number>(0)
        const userStore = useUserStore()
        const { id, userName } = storeToRefs(userStore)
        onMounted(() => {
            var scene = new THREE.Scene();
            var renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            // 设置渲染器尺寸大小
            renderer.setSize(500, 300);

            scene_box?.value?.appendChild(renderer.domElement);
            var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
            camera.position.z = 5;
            scene.add(camera);
            //添加光源
            var light = new THREE.AmbientLight(0xff0000, 1); // soft white light
            scene.add(light);
            //创建几何
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var geometry2 = new THREE.CircleGeometry(1, 0, 0);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ccee });
            // 传入几何对象和材质
            var cube = new THREE.Mesh(geometry, material);
            var material2 = new THREE.MeshBasicMaterial({ color: 0xee88aa });
            var cube2 = new THREE.Mesh(geometry2, material2);
            // 插入到场景中，默认添加到坐标(0, 0, 0)
            scene.add(cube, cube2);
            var animate = function () {
                requestAnimationFrame(animate);
                cube.rotation.x += slider.value;
                cube.rotation.y += slider.value;
                cube2.rotation.x += slider.value;
                cube2.rotation.y += slider.value;
                renderer.render(scene, camera);
            };
            animate();

        })
        const setUser = () => {
            userStore.setUserName('hello')
        }
        return { scene_box, slider, userName, setUser }
    }
})
</script>

<style scoped>
body {
    width: 100%;
}

.container {
    width: 30em;
    height: 100%;
}

.slider {
    width: 300px;
    margin: 0 auto;
}
</style>