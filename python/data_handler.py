from . import contour_detection
from . import tempo_changer
import json

def send_message():
 
    # todo - calculate image not per frame but per time interval
    # why?: Less data is processed. With less processing comes better performance.
    data = []
    # contour count
    contours = contour_detection.get_contour_count()
    data.append(contours)

    # average colorSaturation in the image
    avrg_color_saturation = 0
    data.append(avrg_color_saturation)

    # average color
    avrg_color = 0
    data.append(avrg_color)

    jsonData = json.dumps(data)

    return jsonData


def process_message(data):

    print(json.loads(data))
    decoded_data = json.loads(data)

    if decoded_data[0] == 'videostatus':
        # code if video is paused / played
        return 0

    if decoded_data[0] == 'bpm':
        tempo_changer.update(int(decoded_data[1]))


