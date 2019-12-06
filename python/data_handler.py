from . import contour_detection
from . import tempo_changer
import json

def send_message():
 
    # todo - calculate image not per frame but per time intervall
    # why?: Less data is proccessed. With less proccessing comes better performance.
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


    if(data == 'videostatus'):
        # code if video is paused / played
        return 0

    if(data == 'bpm'):
        tempo_changer.update()


