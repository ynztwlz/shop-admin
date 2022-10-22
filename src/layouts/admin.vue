
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <f-header />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <f-menu />
                </el-aside>
                <el-main>
                    <f-tag-list />
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>
import FHeader from './components/FHeader.vue'
import FTagList from './components/FTagList.vue'
import FMenu from './components/FMenu.vue'
</script>

<style scoped>

</style>
