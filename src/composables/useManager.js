import { showModal, toast } from '~/composables/util'
import { logout, updatePassword } from '~/api/manager';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

export function useRepassword () {
    const store = useStore()
    const router = useRouter()

    const formDrawerRef = ref(null)
    const formRef = ref(null)
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })
    const rules = reactive({
        oldpassword: [
            {
                required: true,
                message: "旧密码不能为空",
                trigger: 'blur'
            }
        ],
        password: [
            {
                required: true,
                message: "新密码不能为空",
                trigger: 'blur'
            }
        ],
        repassword: [
            {
                required: true,
                message: "确认密码不能为空",
                trigger: 'blur'
            }
        ]
    })
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return false
            console.log(form);
            formDrawerRef.value.showLoading()
            updatePassword(form).then(res => {
                toast("修改密码成功")
                store.dispatch("logout")
                router.push("/login")
            }).finally(() => {
                formDrawerRef.value.hidLoading()
            })
        })
    }
    const openRePasswordForm = () => formDrawerRef.value.open()
    return { formDrawerRef, form, rules, formRef, onSubmit, openRePasswordForm }
}

export function useLogout () {
    const store = useStore()
    const router = useRouter()
    function handleLogout () {
        showModal("是否要退出登录？")
            .then(res => {
                logout()
                    .finally(() => {
                        store.dispatch("logout")
                        router.push("/login")
                        toast("退出登录成功")
                    })
            }).catch(err => console.log("取消"))
    }
    return { handleLogout }
}