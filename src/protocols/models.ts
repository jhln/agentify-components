interface AgentComponentConfigOptions {
    id?: string;
    name: string;
    type: string; // e.g., 'button', 'form'
    behavior: {
      type: string; // e.g., 'navigation', 'api'
      [key: string]: any; // Additional behavior properties
    };
    label?: string;
    description: string;
    selector?: string;
    inputSchema?: {
      type: string;
      properties: Record<string, { type: string }>;
      required?: string[];
    };
  }


interface AgentComponent extends React.FC {
    agentConfig?: AgentComponentConfigOptions;
}



export type { AgentComponent, AgentComponentConfigOptions };