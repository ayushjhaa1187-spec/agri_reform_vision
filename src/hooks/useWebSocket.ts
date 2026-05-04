import { useEffect, useState, useCallback, useRef } from 'react';

export const useWebSocket = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket Feed');
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing WS message:', error);
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket Feed');
      setIsConnected(false);
      // Simple reconnect logic
      setTimeout(connect, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
      ws.current?.close();
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [connect]);

  return { data, isConnected };
};
