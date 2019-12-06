# from python import websocket_server

def update(data):
    change_global_tempo(data)

def change_global_tempo(bpm):
    sec = 1 / (bpm / 60);
    #server.changeSleepTime(sec);
    return sec

