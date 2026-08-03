import axios from 'axios';
import * as WebsiteService from '../services/websiteService';
import { IWebsite } from '../models/websiteModel';

export const startMonitoring = async () => {
  console.log('Starting server monitoring...');
  try {
    await checkAllServers();
    console.log('Initial server check completed');
  } catch (error) {
    console.error('Error during initial server check:', error);
  }

  // Check servers every 5 minutes
  setInterval(async () => {
    console.log('Running scheduled status check for all servers...');
    await checkAllServers();
  }, 5 * 60 * 1000);
};

async function checkAllServers() {
  try {
    console.log('Fetching servers from database...');
    const servers: IWebsite[] = await WebsiteService.getAllWebsites();
    console.log(`Found ${servers.length} servers to check`);

    const checkPromises = servers.map(async (server) => {
      try {
        console.log(`Checking server: ${server.url}`);
        const isAlive = await checkIfSiteIsAlive(server.url);
        
        // Only update if status has changed
        if (server.isAlive !== isAlive) {
          console.log(`Status changed for ${server.url}: ${server.isAlive} -> ${isAlive}`);
          
          await WebsiteService.updateStatus(server._id.toString(), isAlive);
        } else {
          console.log(`Status unchanged for ${server.url}: ${isAlive ? 'active' : 'inactive'}`);
        }
        
        return { server, isAlive };
      } catch (error) {
        console.error(`Error processing server ${server.url}:`, error);
        return { server, isAlive: false };
      }
    });

    const results = await Promise.all(checkPromises);
    console.log('All server checks completed');

    // Process any alerts for failed servers
    results
      .filter(result => !result.isAlive)
      .forEach(result => {
        // Implement alert logic if needed
        // sendAlert(result.server);
        console.log(`Alert: ${result.server.name} (${result.server.url}) is down!`);
      });
  } catch (error) {
    console.error('Error getting server list:', error);
  }
}

async function checkIfSiteIsAlive(url: string): Promise<boolean> {
  try {
    console.log(`Making request to: ${url}`);
    const response = await axios.get(url, {
      timeout: 30000 // 30 second timeout
    });
    const isAlive = response.status >= 200 && response.status < 400;
    console.log(`Status for ${url}: ${response.status} (${isAlive ? 'alive' : 'down'})`);
    return isAlive;
  } catch (error: any) {
    console.error(`Error checking ${url}:`, error.message);
    return false;
  }
}

async function updateSiteStatus(serverId: string, isAlive: boolean): Promise<void> {
  try {
    await WebsiteService.updateStatus(serverId, isAlive);
    console.log(`Updated status for server ID ${serverId}: ${isAlive ? 'active' : 'inactive'}`);
  } catch (error) {
    console.error(`Failed to update status for server ID ${serverId}:`, error);
  }
}