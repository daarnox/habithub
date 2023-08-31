<template>
    <header>
        <nav>
            <h1 class="title">//habitHub</h1>
            <ul class="navigation">
                <li><router-link class="link" to="/">home.js</router-link></li>
                <li><router-link class="link" :to="{ name: 'habits' }">habits.js</router-link></li>
                <li><router-link class="link" :to="{ name: 'summary' }">summary.js</router-link></li>
                <button class="link" style="border:none; font-family: consolas; color:#dcdcaa" @click="handleLogOut()">logout.js</button>
            </ul>
        </nav>
    </header>
</template>

<script>

import { supabase } from '@/supabase';

export default {
    methods:{
         async handleLogOut(){
            await supabase.auth.signOut().catch(err => console.log(err));
        }
    }
};
</script>

<style scoped>
header {
    display: flex;
    justify-content: center;
}

nav {
    width: 95%;
    background-color: #252525;
    padding-top: 15px;
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    /* border-image: linear-gradient(to right, #006466,#4d194d) 1; */
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right, #529955, #1e1e1e) 1;
}

.title {
    padding-left: 20px;
    color: #529955;
    align-self: center;
    font-size: 30px;
    font-weight: 200;
    letter-spacing: 2px;
}

.navigation {
    padding-right: 30px;
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    list-style: none;
    text-decoration: none;
}

.link {
    font-weight: 500;
    color: #969696;
    list-style: none;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    font-size: 20px;
    padding: 20px;
    background-color: #2b2b2b;
}

.link:hover {
    color: white;
}

li a.router-link-exact-active {
    background-color: #1e1e1e;
    color: #fff;
}
</style>
