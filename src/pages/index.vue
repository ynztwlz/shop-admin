<template>
  <div>{{$store.state.user.username}}</div>
  <el-button type="primary" size="default" @click="handleLogout">退出</el-button>
  
</template>

<script setup>
import { showModal,toast } from '~/composables/util'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { logout } from '~/api/manager'

const router = useRouter()
const store = useStore() 
function handleLogout(){
  showModal("是否要退出登录？").then(res=>{
    logout()
      .finally(()=>{
        store.dispatch("logout")
        router.push("/login")
        toast("退出登录成功")
      })
  }).catch(err=>{console.log("取消");})
}
</script>

<style scoped>
</style>
