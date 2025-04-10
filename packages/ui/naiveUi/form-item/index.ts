import type { ComponentConfigModel } from '@nada-designer/types';

export default {
  component: () => import('./formItem.vue'),
  config: {},
  defaultSchema: {
    label: '表单项',
    type: 'form-item',
  },
} as ComponentConfigModel;
