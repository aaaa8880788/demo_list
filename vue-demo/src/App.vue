<template>
	<div class="App">
    <el-form inline>
      <el-form-item label="文本">
        <el-input v-model="formText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleBtnClick">添加文本</el-button>
      </el-form-item>
    </el-form>
		<div class="typewriter-container">
			<Typewriter ref="typewriterRef" :text="text"></Typewriter>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Typewriter from "./components/Typewriter.vue";
const text = ref<string>("欢迎使用逐字显示的打字机效果！");
const typewriterRef = ref<any>(null);
const formText = ref('')
const handleBtnClick = () => {
  console.log('formText', formText.value);
  console.log('typewriterRef', typewriterRef.value);
  
  if(formText.value) {
    typewriterRef.value.addNewText(formText.value)
  }
}
</script>

<style scoped lang="less">
.App {
	width: 100%;
	height: 100%;
	display: flex;
  flex-direction: column;
	align-items: center;
	justify-content: center;
	.typewriter-container {
		width: 600px;
		padding: 20px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
}
</style>
