import type { ComponentConfigModel } from '@nada-designer/types';

export default {
  bindModel: 'model-value',
  component: async () => await import('./index.vue'),
  config: {
    attribute: [
      {
        field: 'field',
        label: '字段名',
        type: 'input',
      },
      {
        field: 'label',
        label: '标题',
        type: 'input',
      },
      {
        field: 'componentProps.defaultValue',
        label: '默认值',
        type: 'monacoEditor',
      },
    ],
  },
  defaultSchema: {
    field: 'monacoEditor',
    icon: 'nada-icon-write',
    input: true,
    label: '代码编辑器',
    type: 'monacoEditor',
  },
} as ComponentConfigModel;
