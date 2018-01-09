<template>
    <div class="container">
        <section class="hero is-dark is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Welcome Lidis
                    </h1>
                    <h2 class="subtitle">
                        A beautiful, database manage application for Redis.
                    </h2>
                    <div class="field">
                        <p class="control">
                            <input v-model="address" class="input" type="text" placeholder="Host:Port">
                        </p>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button @click="handleLogin" class="button is-link">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script src="./index.js">
</script>

