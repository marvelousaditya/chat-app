import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

const subscriber = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PWD,
  username: process.env.REDIS_USER,
  tls: {},
});

const publisher = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PWD,
  username: process.env.REDIS_USER,
  tls: {},
});

export function subscribe(
  channel: string,
  callback: (msg: string) => void
): void {
  subscriber.subscribe(channel, (err, count) => {
    if (err) {
      console.error("Error subscribing to channel:", err);
      return;
    }
    console.log(`Subscribed to ${channel}`);
  });

  subscriber.on("message", (subscribedChannel, message) => {
    console.log(`Subscriber ${subscribedChannel} received message: ${message}`);
    if (subscribedChannel === channel) {
      callback(message);
    }
  });
}
export function unsubscribe(channel: string): void {
  subscriber.unsubscribe(channel, (err, count) => {
    if (err) {
      console.error("Error unsubscribing from channel:", err);
      return;
    }
    console.log(`Unsubscribed from ${channel}`);
  });
}

export async function publish(channel: string, message: string): Promise<void> {
  try {
    await publisher.publish(channel, message);
    console.log(`Published message to ${channel}: ${message}`);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
}
