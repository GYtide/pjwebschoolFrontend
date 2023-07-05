import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';

import bootstrap from './core/bootstrap';
import '/@/styles/reset.less';
import '/@/styles/index.less';
import Antd from 'ant-design-vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(Antd);
app.use(router);
app.use(piniaStore);
app.use(bootstrap);
app.mount('#app');
