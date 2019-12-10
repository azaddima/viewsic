# from python import websocket_server
import math

# todo - change variable access
message_interval = 0.5


def update(data):
    change_global_tempo(data)


def change_global_tempo(bpm):
    global message_interval

    sec = 1 / (bpm / 60)
    message_interval = sec
    print('intervall changed to ' + str(sec))


def tempo_contour(value):
    global message_interval

    # if value > 1300:
    bpm = math.log10(2) * value
    if bpm < 60:
        bpm = 60

    if bpm > 450:
        bpm = 450

    sec = 1 / (bpm / 60)
    message_interval = sec
