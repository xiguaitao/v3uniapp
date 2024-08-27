<template>
	<view class='contractsManagement'>
		<view id="pdf-container">
			<canvas v-for="page in state.pdfPages" :key="page" :id="`pdfCanvas${page}`"
				style="border-bottom:1px solid #d4d2d2;width: 100%;height: 100%;" />
		</view>
		<!-- <canvas v-for="page in state.pdfPages" :key="page" :id="`pdfCanvas${page}`"
			style="border-bottom:1px solid #d4d2d2; "></canvas> -->

		<!-- <page-frame title="合同管理" :isRefresherEnabled="false" :isShowNodata="false" :safeAreaInsetBut="false"
			background="#F0F3F5" navbarColor="#fff" :bg="false">
			<view class="contractsManagement-main">
				<signBoard></signBoard>
				<view></view>
				<view></view>
			</view>"https://water-1319794570.cos.ap-guangzhou.myqcloud.com/2024-06-19/911-1718789023533.pdf"
		</page-frame> -->
	</view>
</template>
<script setup name='contractsManagement'>
import { createApp, ref, reactive, onMounted, nextTick } from 'vue'
import * as PDF from 'pdfjs-dist'
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry')
PDF.GlobalWorkerOptions.workerSrc = pdfjsWorker
// import pdf from '/images/file/11.pdf'

const state = reactive({
	pdfPath: 'https://water-1319794570.cos.ap-guangzhou.myqcloud.com/2024-06-19/911-1718789023533.pdf', // 本地PDF文件路径放在/public中
	pdfPages: '', // 页数
	pdfWidth: '', // 宽度
	pdfSrc: '', // 地址
	pdfScale: 0.7, // 放大倍数
})
let pdfDoc = null
onMounted(() => {
	loadFile(state.pdfPath)
})
function loadFile(url) {
	PDF.getDocument(url).promise.then((p) => {
		pdfDoc = p
		const { numPages } = p
		state.pdfPages = numPages
		nextTick(() => {
			renderPage(1) // 从第一页开始渲染
		})
	})
}
function renderPage(num) {
	pdfDoc.getPage(num).then((page) => {
		const canvasId = `pdfCanvas${num}`
		const query = uni.createSelectorQuery()
		query.select(`#${canvasId}`)
			.fields({ node: true, size: true })
			.exec((res) => {
				const canvas = res[0].node
				const ctx = canvas.getContext('2d')
				const dpr = uni.getSystemInfoSync().pixelRatio || 1
				const bsr
					= ctx.webkitBackingStorePixelRatio
					|| ctx.mozBackingStorePixelRatio
					|| ctx.msBackingStorePixelRatio
					|| ctx.oBackingStorePixelRatio
					|| ctx.backingStorePixelRatio
					|| 1
				const ratio = dpr / bsr
				const viewport = page.getViewport({ scale: state.pdfScale })
				canvas.width = viewport.width * ratio * 4
				canvas.height = viewport.height * ratio * 4
				// canvas.style.width = '600px'
				// canvas.style.height = '600px'
				state.pdfWidth = `${viewport.width}px`
				ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
				const renderContext = {
					canvasContext: ctx,
					viewport,
				}
				page.render(renderContext)
				if (state.pdfPages > num)
					renderPage(num + 1)
			})
	})
}
</script>
<style lang='scss' scoped>
.contractsManagement {
	height: 100%;

	#pdf-container {
		height: 100%;
		overflow: auto;
	}

	.contractsManagement-main {}
}
</style>