import cac from 'cac';

import { defineCheckCompiledCommand } from './check-compiled';
// 创建 nada 实例
const nada = cac('nada');

defineCheckCompiledCommand(nada);

// 解析命令行参数
nada.parse();
