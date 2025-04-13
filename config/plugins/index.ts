import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import appInfo from './app-info'
import createDevtools from './devtools'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSvgIcon from './svg-icon'
import createMock from './mock'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [appInfo(), vue(), vueJsx()]
  vitePlugins.push(createDevtools(viteEnv))
  vitePlugins.push(createAutoImport())
  vitePlugins.push(UnoCSS())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(viteEnv, isBuild))
  vitePlugins.push(AutoImport({
    imports: [
      'vue',
      {
        'naive-ui': [
          'useDialog',
          'useMessage',
          'useNotification',
          'useLoadingBar'
        ]
      }
    ]
  }))
  vitePlugins.push(Components({
    resolvers: [NaiveUiResolver()]
  }))

  return vitePlugins
}
