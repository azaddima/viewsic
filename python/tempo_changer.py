# from python import websocket_server

message_interval = 0.5

def update(data):
    change_global_tempo(data)

def change_global_tempo(bpm):
    sec = 1 / (bpm / 60);
    #server.changeSleepTime(sec);
    message_interval = sec
1