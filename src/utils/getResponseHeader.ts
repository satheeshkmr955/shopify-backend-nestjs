import { Plugin } from 'graphql-yoga';
import os from 'os';

// Function to get the local IP address of the server
export const getServerIp = () => {
  const interfaces = os.networkInterfaces() || {};
  let serverIp = '127.0.0.1'; // Default to localhost

  for (const interfaceKey in interfaces) {
    const interfaceSubObj = interfaces[interfaceKey] || [];
    for (const interfaceInfo of interfaceSubObj) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        serverIp = interfaceInfo.address;
        break;
      }
    }
  }

  return serverIp;
};

export function useSetResponseHeader(): Plugin {
  return {
    onResponse({ response }) {
      const serverIp = getServerIp();
      const date = new Date().toISOString();
      response.headers.set('X-Server-IP', serverIp);
      response.headers.set('X-Server-Date-Time', date);
    },
  };
}
