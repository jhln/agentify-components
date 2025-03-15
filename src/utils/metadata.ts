import 'reflect-metadata';
import { AGENT_CONFIG_KEY } from '../decorators';
import { AgentComponent, AgentComponentConfigOptions } from '../protocols/models';


export function getAgentConfig(target: any) {
  // check for config in target
  if (target.agentConfig) {
    return target.agentConfig;
  }
  return Reflect.getMetadata(AGENT_CONFIG_KEY, target);
}


