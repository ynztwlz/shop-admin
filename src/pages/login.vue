<template>
    <el-row class="min-h-screen bg-indigo-500">
        <el-col :lg="16" :md="12" class="flex items-center justify-center">
            <div>
                <div class="font-bold text-5xl text-left text-light-50 mb-4">欢迎光临</div>
                <div class="text-gray-200 text-sm">此站点是《vue3 + vite实战商城后台开发》视频课程的演示地址</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="flex items-center justify-center bg-light-50 flex-col">
            <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
            <div class="flex items-center justify-center text-gray-300 space-x-2 my-5">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-200"></span>
            </div>
            <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" round color="#626aef" type="primary" class="w-[250px]"
                        @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login, getInfo } from '~/api/manager'
import { setToken} from '~/composables/auth'
import { toast } from '~/composables/util'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const formRef = ref(null)
const loading = ref(false)
const router = useRouter()
const store = useStore()
const form = reactive({
    username: "",
    password: ""
})

const rules = reactive({
    username: [{
        required: true,
        message: '用户名不能为空。',
        trigger: 'blur'
    }, {
        min: 3,
        message: "用户名长度必须大于2",
        trigger: 'blur'
    }],
    password: [{
        required: true,
        message: '密码不能为空。',
        trigger: 'blur'
    }, {
        min: 3,
        message: "密码长度必须大于3",
        trigger: 'blur'
    }],
})

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) { return false }
        loading.value = true
        login(form.username, form.password)
            .then(res => {
                toast("请求成功")
                // 存储token
                setToken(res.token)

                // 跳转到后台首页
                router.push("/")
            })
            .finally(() => loading.value = false)
    })
}

</script>

<style scoped>

</style>