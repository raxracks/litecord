type GatewayEventType = "READY" | "MESSAGE_CREATE";

interface GatewayPayload {
  op: number;
  t?: GatewayEventType;
  d?: any;
  s?: number;
}

enum GatewayOp {
  Ready = 0,
  Heartbeat = 1,
  Identify = 2,
  Hello = 10,
}

type GatewayEventHandler = (data: any) => void;

export default class DiscordGateway {
  private socket: WebSocket;
  private token: string;
  private heartbeatInterval: number;
  private sequenceNumber: number;
  private eventHandlers: Record<GatewayEventType, GatewayEventHandler[]> = {
    READY: [],
    MESSAGE_CREATE: [],
  };

  constructor(token: string) {
    this.token = token;
    this.socket = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
    this.heartbeatInterval = 0;
    this.sequenceNumber = 0;

    this.socket.addEventListener("open", this.handleSocketOpen);
    this.socket.addEventListener("message", this.handleSocketMessage);
    this.socket.addEventListener("close", this.handleSocketClose);
  }

  private handleSocketOpen = (): void => {
    console.log("Socket open");
  };

  private handleSocketMessage = (event: { data: string }): void => {
    const payload: GatewayPayload = JSON.parse(event.data);

    console.log(payload);

    if (payload.op === GatewayOp.Hello) {
      this.heartbeatInterval = payload.d.heartbeat_interval;
      this.startHeartbeat();
      this.sendIdentify();
    }

    if (payload.op === GatewayOp.Heartbeat) {
      this.sendHeartbeat();
    }

    this.sequenceNumber = payload.s || this.sequenceNumber;

    if (payload.op === 0 && payload.t && this.eventHandlers[payload.t]) {
      this.eventHandlers[payload.t].forEach((handler) => handler(payload.d));
    }
  };

  private handleSocketClose = (): void => {
    clearInterval(this.heartbeatInterval);
    console.log("Socket connection closed");
  };

  private sendPayload = (op: number, d?: any): void => {
    const payload: GatewayPayload = { op, d };
    if (this.sequenceNumber) {
      payload.s = this.sequenceNumber;
    }
    this.socket.send(JSON.stringify(payload));
  };

  private sendIdentify = (): void => {
    const payload = {
      token: this.token,
      intents: 3276799,
      properties: {
        $os: "linux",
        $browser: "my_library",
        $device: "my_library",
      },
    };
    this.sendPayload(GatewayOp.Identify, payload);
  };

  private sendHeartbeat = (): void => {
    console.log("Sending heartbeat...");
    this.sendPayload(GatewayOp.Heartbeat, this.sequenceNumber);
  };

  private startHeartbeat = (): void => {
    console.log(`Starting heartbeat at ${this.heartbeatInterval}ms`);
    this.sendHeartbeat();
    setInterval(this.sendHeartbeat, this.heartbeatInterval);
  };

  public on = (event: GatewayEventType, handler: GatewayEventHandler): void => {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].push(handler);
    } else {
      this.eventHandlers[event] = [handler];
    }
  };
}
