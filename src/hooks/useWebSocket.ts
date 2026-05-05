import { useState, useEffect, useRef } from 'react';

interface FarmData {
  farm_id: string;
  soil_moisture: number;
  temperature: number;
  humidity: number;
  current_disease_risk: number;
  yield_reduction_risk: number;
}

interface WeatherData {
  rain_probability: number;
  forecast_temp: number;
}

interface TelemetryPayload {
  type: 'telemetry';
  data: {
    farm: FarmData;
    weather: WeatherData;
    timestamp: string;
  };
}

interface AgentDecisionPayload {
  type: 'agent_decision';
  data: {
    agent: string;
    decision: string;
    action_type: 'alert' | 'negotiation' | 'decision' | 'ml';
    timestamp: string;
  };
}

type WsPayload = TelemetryPayload | AgentDecisionPayload;

export function useWebSocket(url: string) {
  const [telemetry, setTelemetry] = useState<TelemetryPayload['data'] | null>(null);
  const [agentDecisions, setAgentDecisions] = useState<AgentDecisionPayload['data'][]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectCount, setReconnectCount] = useState(0);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WS connected to', url);
        setIsConnected(true);
      };

      ws.current.onclose = () => {
        console.log('WS disconnected from', url);
        setIsConnected(false);
        // Exponential backoff or simple delay
        setTimeout(() => {
          setReconnectCount(prev => prev + 1);
        }, 3000);
      };

      ws.current.onmessage = (event) => {
        try {
          const payload: WsPayload = JSON.parse(event.data);
          if (payload.type === 'telemetry') {
            setTelemetry(payload.data);
          } else if (payload.type === 'agent_decision') {
            setAgentDecisions(prev => [payload.data, ...prev].slice(0, 50));
          }
        } catch (e) {
          console.error('Failed to parse WS message', e);
        }
      };
    };

    connect();

    return () => {
      if (ws.current) {
        ws.current.onclose = null; // Prevent reconnect on intentional unmount
        ws.current.close();
      }
    };
  }, [url, reconnectCount]);

  return { isConnected, telemetry, agentDecisions };
}
