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
const isSubmitting = ref<boolean>(false)

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
    errors.value = {}
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
        errors.value.password = "Введите пароль"
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

const resetForm = () => {
    firstName.value = '',
        lastName.value = '',
        email.value = '',
        phone.value = '',
        password.value = '',
        repeatPassword.value = ''
    errors.value = {}
}

const handleSubmit = async () => {
    if (!validate()) {
        toast.error('Пожалуйста исправьте ошибки')
        return
    }

    isSubmitting.value = true
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

        resetForm();

    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } }
            toast.error(`Ошибка: ${axiosError.response?.data?.message || 'Произошла ошибка запроса'}`)
        } else if (error instanceof Error) {
            toast.error(`Ошибка: ${error.message}`)
        } else {
            toast.error('Произошла непредвиденная ошибка')
        }
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section class="container">
        <h2 class="title">Регистрация</h2>
        <form @submit.prevent="handleSubmit" class="form">
            <div class="form__item" :class="{ error: errors.firstName }">
                <label for="">Имя</label>
                <input type="text" v-model="firstName" />
                <span class="error_message">{{ errors.firstName }}</span>
            </div>
            <div class="form__item" :class="{ error: errors.lastName }">
                <label for="">Фамилия</label>
                <input type="text" v-model="lastName" />
                <span class="error_message">{{ errors.lastName }}</span>
            </div>
            <div class="form__item" :class="{ error: errors.email }">
                <label for="">Почта</label>
                <input type="emial" v-model="email" />
                <span class="error_message">{{ errors.email }}</span>
            </div>
            <div class="form__item" :class="{ error: errors.phone }">
                <label for="">Номер</label>
                <input type="text" v-model="phone" />
                <span class="error_message">{{ errors.phone }}</span>
            </div>
            <div class="form__item" :class="{ error: errors.password }">
                <label for="">Пароль</label>
                <input type="password" v-model="password" />
                <span class="error_message">{{ errors.password }}</span>
            </div>
            <div class="form__item" :class="{ error: errors.repeatPassword }">
                <label for="">Подтвердите пароль</label>
                <input type="password" v-model="repeatPassword" />
                <span class="error_message">{{ errors.repeatPassword }}</span>
            </div>
            <button class="submitBtn" type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Отправляем данные...' :
                'Зарегистрироваться'}}</button>
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

.form__item.error input {
    border-color: red;
}

.error_message {
    color: red;
}

.submitBtn:disabled {
    background-color: #aaa;
    cursor: not-allowed;
}
</style>
