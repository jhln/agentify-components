import { generateMCPServer } from '@anvos/agentify-components';
import * as components from './components/ButtonExample';

const componentList = Object.values(components);

console.log(componentList);
generateMCPServer(componentList, './mcpServer');