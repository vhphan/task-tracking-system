import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'

export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}
    return defineConfig(
        {
            server: {
                port: process.env.VITE_PORT || 3000,
            },
            base: '/app/tts/',
            plugins: [
                vue({
                    template: {transformAssetUrls}
                }),
                quasar({
                    sassVariables: 'src/quasar-variables.sass',
                }),
            ],
            define: {
                '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
            },
        }
    )

}