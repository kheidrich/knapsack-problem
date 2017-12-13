import { ipcRenderer } from "electron";

class IpcService {
    constructor() {
        this.requests = [];
        this.pending = [];
        ipcRenderer.setMaxListeners(3000);
    }

    request(channel, data) {
        const noMorePendingRequests = (this.pending.length === 0);
        let lastId, senderId;

        if (noMorePendingRequests) this.requests = [];
        lastId = this.requests[this.requests.length - 1] || 0;
        senderId = lastId + 1;

        this.requests.push(senderId);
        this.pending.push(senderId);

        return new Promise((resolve, reject) => {
            ipcRenderer.send(channel, Object.assign({ senderId }, data ));
            ipcRenderer.once(`${senderId}-reply`, (event, reply) => {
                

                this.pending = this.pending.filter(id => id !== senderId);
                

                (reply.status === 'error') ?
                    reject(reply.error) :
                    resolve(reply.data)
            });
        })
    }
}

export default IpcService;