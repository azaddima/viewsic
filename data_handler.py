import tempo_changer
import websocket_server
import json

videoStatus = True
selectedFrameIndex = 0


def send_message(data):
    # todo - calculate image not per frame but per time interval
    # why?: Less data is processed. With less processing comes better performance.
    data = []
    # contour count
    contours = data
    data.append(contours)

    # average colorSaturation in the image
    avrg_color_saturation = 0
    data.append(avrg_color_saturation)

    # average color
    avrg_color = 0
    data.append(avrg_color)

    jsonData = json.dumps(data)

    return jsonData


def process_message():
    global videoStatus, selectedFrameIndex

    messages = websocket_server.receivedMessages
    if not messages.empty():
        data = messages.get()

        print(json.loads(data))
        decoded_data = json.loads(data)

        if decoded_data[0] == 'videostatus':
            if str(decoded_data[1]) == 'True':
                videoStatus = True
                print('Videostatus changed: ' + str(videoStatus))
            if str(decoded_data[1]) == 'False':
                videoStatus = False
                print('Videostatus changed: ' + str(videoStatus))

            return 0

        if decoded_data[0] == 'bpm':
            tempo_changer.update(int(decoded_data[1]))
            # websocket_server.changeSleepTime(tempo_changer.message_interval)

        if decoded_data[0] == 'ViewSelectionCounter':
            selectedFrameIndex = decoded_data[1]