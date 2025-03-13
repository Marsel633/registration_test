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
const errors = ref<{ [key: string]: string }>({})

const API = 'https://jsonplaceholder.typicode.com/posts'

const isValidatePhone = (value: string): boolean => {
    const digitsOnlyRegex = /^\d+$/;
    return digitsOnlyRegex.test(value);
};

const isValidateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


const validate = (): boolean => {
    if (!firstName.value.trim()) {
        errors.value.firstName = 'Введите имя'
    }

    if (!lastName.value.trim()) {
        errors.value.lastName = 'Введите фамилию'
    }

    if (!email.value.trim()) {
        errors.value.email = "Введите почту"
    } else if (!isValidateEmail(email.value)) {
        errors.value.email = 'Введите корректную почту'
    }
    if (!phone.value.trim()) {
        errors.value.phone = 'Введите номер телефона'
    } else if (!isValidatePhone(phone.value)) {
        errors.value.phone = 'Введите корректный номер'
    }
    if (!password.value.trim()) {
        errors.value.phone = "Введите пароль"
    } else if (password.value.length < 8) {
        errors.value.password = 'Пароль должен содержать не менее 8 символов'
    }
    if (!repeatPassword.value.trim()) {
        errors.value.repeatPassword = 'Введите пароль повторно'
    } else if (repeatPassword.value !== password.value) {
        errors.value.repeatPassword = 'Пароли не совпадают'
    }
    return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
    if(!validate()) {
        toast.error('Пожалуйста исправьте ошибки')
        return
    }
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
        if (error) {
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
