<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'

const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')
const password = ref<string>('')
const repeatPassword = ref<string>('')

const API = 'https://jsonplaceholder.typicode.com/posts'

const handleSubmit = async () => {
    try {
        const response = await axios.post(API, {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            repeatPassword: repeatPassword.value,
        })

        toast.success('Вы успешно зарегистрировались!')
    } catch (error: unknown) {
        console.error(error)
        if(error) {
            // toast.error(`Ошибка: ${error.response?.data?.message || error.message}`)
        } else {
            toast.error('Произошла непредвиденная ошибка')
        }
    }
}
</script>

<template>
    <section class="container">
        <h2 class="title">Регистрация</h2>
        <form @submit.prevent="handleSubmit" class="form">
            <div class="form__item">
                <label for="">Имя</label>
                <input type="text" v-model="firstName" />
            </div>
            <div class="form__item">
                <label for="">Фамилия</label>
                <input type="text" v-model="lastName" />
            </div>
            <div class="form__item">
                <label for="">Почта</label>
                <input type="emial" v-model="email" />
            </div>
            <div class="form__item">
                <label for="">Номер</label>
                <input type="text" v-model="phone" />
            </div>
            <div class="form__item">
                <label for="">Пароль</label>
                <input type="password" v-model="password" />
            </div>
            <div class="form__item">
                <label for="">Подтвердите пароль</label>
                <input type="password" v-model="repeatPassword" />
            </div>
            <button class="submitBtn" type="submit">Зарегистрироваться</button>
        </form>
    </section>
</template>

<style scoped>
.container {
    max-width: 400px;
    margin: 50px auto;
    padding: 25px;
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form__item {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form__item label {
    padding-left: 10px;
    font-weight: bold;
    margin-bottom: 5px;
}

.form__item input {
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
}

.submitBtn {
    outline: none;
    border: 1px solid #ccc;
    background-color: #4CAF50;
    padding: 15px;
    cursor: pointer;
    color: #ffffff;
    font-size: 1rem;
}

.submitBtn:hover {
    background-color: #359238;
}
</style>
