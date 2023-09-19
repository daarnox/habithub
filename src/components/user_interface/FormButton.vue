<template>
    <button class="button">
        <slot></slot>
    </button>
</template>
  
<script>
export default {
    name: "FormButton",
};
</script>

<style scoped>
.button {
  /* display: inline-block; */
  /* height: 200px;
  width: 200px; */
  /* -webkit-appearance: none; */
  /* box-shadow:
    -5px -5px 5px rgba(82, 153, 85, 0.5),
    5px 5px 5px rgb(156, 220, 254, 0.2); */
  box-shadow:
    -5px -5px 5px rgba(70, 70, 70, 0.1),
    5px 5px 5px rgb(0, 0, 0, 0.2);
  /* position: absolute; */
  /* transform: translate(-50%, -50%); */
  /* top: 50%;
  left: 50%; */
  /* border-radius: 50%; */
  border-radius: 50px;
  min-width: 50px;
  height: 50px;
  border: 5px solid #202020;
  background-color: #1e1e1e;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
  font-family: consolas;
  margin: 5px;
  color: #fff;
  font-size: 14px;
  padding: 25px;
}

.button:hover {
  /* background-color: #529955; */
  box-shadow:
    -5px -5px 5px rgba(70, 70, 70, 0.1),
    5px 5px 5px rgb(0, 0, 0, 0.2),
    inset -5px -5px 5px rgba(70, 70, 70, 0.1),
    inset 5px 5px 5px rgb(0, 0, 0, 0.2); 
  color: #529955;
}
</style>