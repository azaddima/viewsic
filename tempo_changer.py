# from python import websocket_server
# todo - change variable access
message_interval = 0.5

def update(data):
    change_global_tempo(data)

def change_global_tempo(bpm):
    global  message_interval

    sec = 1 / (bpm / 60)
    message_interval = sec
    print('intervall changed to ' + str(sec))

