import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
	base: '/agency/',
	plugins: [
		uni(),
		basicSsl()
	],
	server: {
		https: true,
		proxy: {
			'/api': {
				target: 'http://192.168.2.188:8082', // 目标服务  
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			}
		}
	}
})

