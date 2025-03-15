import 'reflect-metadata';
import { AgentComponent, AgentComponentConfigOptions } from '../protocols/models';

export const AGENT_CONFIG_KEY = Symbol('agentConfig');

// Decorator to attach agent config to a class
export function AgentConfig(config: any) {
  return function (target: Function) {
    // @ts-ignore - Reflect.defineMetadata comes from reflect-metadata package
    Reflect.defineMetadata(AGENT_CONFIG_KEY, config, target);
  };
}


// HOC to attach agent config to a functional component
export function withAgentConfig(config: AgentComponentConfigOptions) {
  return function(component: React.FC): AgentComponent {
    return Object.assign(component, { agentConfig: config });
  };
}



