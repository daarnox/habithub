<template>
    <input class="text-input" placeholder={{placeholder}}/>>
    <!-- how to implement v-model mechanism??? -->
</template>
  
<script>
export default {
    name: "FormTextInput",
    props: [
        "placeholder"
    ]
};
</script>

<style scoped>
.text-input {

    display: inline-block;
    outline: none;
    font-size: 10px;
    line-height: 1;
    border-radius: 500px;
    border: 1px solid transparent;
    letter-spacing: 2px;
    min-width: 160px;
    text-transform: uppercase;
    white-space: normal;
    font-weight: 700;
    text-align: center;
    padding: 16px 14px 18px;
    color: #fff;
    box-shadow: inset 0 0 0 2px #fff;
    background-color: transparent;
    height: 48px;

}
</style>