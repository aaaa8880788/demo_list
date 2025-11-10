<template>
  <div class="Typewriter">
    <p id="typewriter-text" class="typewriter-text" ref="textRef">
      {{ currentText }}
    </p>
			<span class="typewriter-cursor"></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
const props = withDefaults(defineProps<{
  text?: string;
  speed?: number;
}>(), {
  text: '',
  speed: Math.floor(Math.random() * (300 - 50 + 1)) + 50 // 模拟人类打字速度
});

const textRef = ref<any>(null)
const completeText = ref<string>(props.text);
const currentText = ref<string>("");
const textCharIndex = ref(0)
const writerTimer = ref<any>(null)

const typeWriter = () => {
	if (textCharIndex.value < completeText.value.length) {
    currentText.value = currentText.value + completeText.value.charAt(textCharIndex.value);
    textCharIndex.value += 1;
		writerTimer.value = setTimeout(typeWriter, props.speed);
	}else {
    writerTimer.value = null;
  }
};

const addNewText = (text: string, isLineFeed = true) => {
  completeText.value = completeText.value + `${isLineFeed ? '\n' : ''}${text}`
  console.log('writerTimer.value', writerTimer.value);
  
  if(!writerTimer.value) {
    typeWriter()
  }
}

const typewriterInit = () => {
  if(textRef.value && props.text) {
    typeWriter();
  }
}
onMounted(() => {
  typewriterInit()
})
onUnmounted(() => {
  writerTimer.value && clearTimeout(writerTimer.value)
  writerTimer.value = null;
})
defineExpose({
  addNewText
})
</script>

<style scoped lang="less">
.Typewriter {
  .typewriter-text {
		font-size: 18px;
		line-height: 1.5;
		margin: 0;
		display: inline;
    /* 关键样式：识别 \n 并自动换行 */
    white-space: pre-line;
	}
	.typewriter-cursor {
		display: inline-block;
		width: 10px;
		height: 5px;
		background-color: #333;
		margin-left: 2px;
		animation: blink 0.7s infinite;
		vertical-align: bottom;
	}

	@keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
}
</style>