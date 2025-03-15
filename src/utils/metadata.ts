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

export function withAgentConfig(config: AgentComponentConfigOptions) {
  return function(component: React.FC): AgentComponent {
    return Object.assign(component, { agentConfig: config });
  };
}

