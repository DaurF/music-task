import './index.css'
import { createApp } from 'vue'

import App from './App.vue'
import {router, store} from "./providers";

export const app = createApp(App).use(store).use(router)

