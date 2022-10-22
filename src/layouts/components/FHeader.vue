<template>
    <div class="flex items-center h-[64px] fixed top-0 left-0 right-0 bg-indigo-700 text-light-50">
        <span class="flex w-[250px] justify-center items-center text-xl font-thin">
            <el-icon class="mr-1">
                <eleme-filled />
            </el-icon>笛莎编程
        </span>
        <el-tooltip effect="dark" content="折叠" placement="bottom">
            <el-icon class="flex justify-center items-center w-[42px] h-[64px] cursor-pointer hover:bg-indigo-600">
                <fold />
            </el-icon>
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon @click="handleRefresh"
                class="flex justify-center items-center w-[42px] h-[64px] cursor-pointer hover:bg-indigo-600">
                <refresh />
            </el-icon>
        </el-tooltip>
        <div class="mr-1 flex items-center ml-auto">
            <el-tooltip effect="dark" content="录像" placement="bottom">
                <el-icon class="flex justify-center items-center w-[42px] h-[64px] cursor-pointer hover:bg-indigo-600">
                    <VideoCamera />
                </el-icon>
            </el-tooltip>
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon @click="toggle"
                    class="flex justify-center items-center w-[42px] h-[64px] cursor-pointer hover:bg-indigo-600">
                    <FullScreen v-if="!isFullscreen" />
                    <aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown @command="handleCommand" class="h-[64px] cursor-pointer flex justify-center items-center mx-5">
                <span class="flex items-center text-light-50">
                    <el-avatar :size="25" class="mr-2" :src="$store.state.user.avatar" />
                    {{$store.state.user.username}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form :rules="rules" ref="formRef" :model="form" label-width="120px">
            <el-form-item prop="oldpassword" label="旧密码" label-width="80px" size="small">
                <el-input v-model="form.oldpassword" type="password" show-password placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item prop="password" label="新密码" label-width="80px" size="small">
                <el-input v-model="form.password" type="password" show-password placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码" label-width="80px" size="small">
                <el-input v-model="form.repassword" type="password" show-password placeholder="请输入确认密码" />
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import FormDrawer from '~/components/FormDrawer.vue'
import { useRepassword, useLogout } from "~/composables/useManager"

const { isFullscreen, toggle } = useFullscreen()

const { formDrawerRef, form, rules, formRef, onSubmit, openRePasswordForm } = useRepassword()
const { handleLogout } = useLogout()

const handleRefresh = () => location.reload()
const handleCommand = (command) => {
    if (command == "rePassword") {
        openRePasswordForm()
    }
    else if (command == "logout") {
        handleLogout()
    }
}
</script>

<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>
