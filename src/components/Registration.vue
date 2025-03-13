<script setup lang="ts">

</script>

<template>
    <section class="container">
        <h2 class="title">Регистрация</h2>
        <form class="form" action="">
            <div class="form__item">
                <label for="">Имя</label>
                <input type="text">
            </div>
            <div class="form__item">
                <label for="">Фамилия</label>
                <input type="text">
            </div>
            <div class="form__item">
                <label for="">Почта</label>
                <input type="text">
            </div>
            <div class="form__item">
                <label for="">Номер</label>
                <input type="text">
            </div>
            <div class="form__item">
                <label for="">Пароль</label>
                <input type="text">
            </div>
            <div class="form__item">
                <label for="">Подтвердите пароль</label>
                <input type="text">
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
