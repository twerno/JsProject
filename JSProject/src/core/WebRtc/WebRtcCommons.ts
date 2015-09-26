///<reference path="../../lib/RTCPeerConnection.d.ts"/>
///<reference path="../CommTypy.ts"/>
	


interface IWebRtcConnectionData {
    RTCSessionDescription?: RTCSessionDescription;
    RTCIceCandidate?: RTCIceCandidate;
}



interface IWebRtcConnectionDataCallback {
    (data: IWebRtcConnectionData): void;
}



class WebRtcConnectionInitializationError {

    name: string;

    constructor(public message: string) {
        this.name = 'WebRtcConnectionInitializationError';
    }
}



class WebRtcConnectionNotInitializedError {

    name: string;


    constructor(public message: string) {
        this.name = 'WebRtcConnectionNotInitializedError';
    }
}



interface IWebRtcCommunicatorData extends IWebRtcConnectionData {
    pass2: string;
}



interface FWebRtcCommunicatorDataCallback {
    (data: IWebRtcCommunicatorData): void;
}



class EWebRtcConfigureTimeout { };