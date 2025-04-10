import type { ComponentSchema } from '@nada-designer/types';

export interface TreeProps {
  draggable?: boolean;
  hoverKey?: string;
  options: ComponentSchema[];
  selectedKeys: string[];
}
