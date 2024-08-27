<template>
	<view class='pdf-x'>
		<view class="pdf-loading" v-if="loading">
			<tn-loading :show="true" type="primary" mode="flower" animation size="xl" />
		</view>
		<view id="pdf-container"></view>


	</view>
</template>
<script setup name='pdf-x'>
import * as PDF from 'pdfjs-dist'
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry')
PDF.GlobalWorkerOptions.workerSrc = pdfjsWorker
import { onShow, onHide } from '@dcloudio/uni-app'
import { ref, reactive, onMounted, nextTick, defineEmits } from 'vue'


onShow(() => {
	nextTick(() => {
		loadFile(state.pdfPath)
	})
})

const loading = ref(false)
const emit = defineEmits(['loadStart', 'endOfLoading'])

const props = defineProps({
	pdfPath: {
		type: String,
		default: ""
	},
	pdfScale: {
		type: Number,
		default: 1
	},
})
const state = reactive({
	pdfPath: props.pdfPath, // 本地PDF文件路径放在/public中
	pdfPages: '', // 页数
	pdfWidth: '', // 宽度
	pdfSrc: '', // 地址
	pdfScale: props.pdfScale, // 放大倍数 
})
let pdfDoc = null

function loadFile(url) {
	emit("loadStart")
	loading.value = true;
	PDF.getDocument(url).promise.then((p) => {
		pdfDoc = p
		const { numPages } = p
		state.pdfPages = numPages
		nextTick(() => {
			renderPage(1) // 从第一页开始渲染
		})
	}).catch((err) => {
		loading.value = false;
	})
}
function renderPage(num) {
	pdfDoc.getPage(num).then((page) => {
		const view = document.getElementById("pdf-container")
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')
		const dpr = window.devicePixelRatio || 1
		const bsr
			= ctx.webkitBackingStorePixelRatio
			|| ctx.mozBackingStorePixelRatio
			|| ctx.msBackingStorePixelRatio
			|| ctx.oBackingStorePixelRatio
			|| ctx.backingStorePixelRatio
			|| 1
		const ratio = dpr / bsr
		const viewport = page.getViewport({ scale: state.pdfScale })
		canvas.width = viewport.width * ratio
		canvas.height = viewport.height * ratio
		const ratios = view.offsetWidth / viewport.width;
		// const width =ratios*(viewport.width )
		const height = ratios * (viewport.height)
		canvas.style.width = view.offsetWidth + "px"
		canvas.style.height = height + "px"
		state.pdfWidth = `${viewport.width}px`
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
		// 将 PDF 页面渲染到 canvas 上下文中
		const renderContext = {
			canvasContext: ctx,
			viewport,
		}
		page.render(renderContext)
		view.appendChild(canvas);
		if (state.pdfPages > num) {
			renderPage(num + 1)
		} else {
			emit("endOfLoading")
			loading.value = false
		}

	})
}

</script>
<style lang='scss' scoped>
.pdf-x {
	height: 100%;
	position: relative;

	.pdf-loading {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.8);
		z-index: 666;
		display: grid;
		place-content: center;
	}

	#pdf-container {
		height: 100%;
	}
}
</style>