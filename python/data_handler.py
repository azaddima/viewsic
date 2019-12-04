from python import contour_detection

def prepare_message_send():
 
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

    return data


def process_message_receive(data):

    if(data == True):
        # code if video is paused / played
        return 0



    if(data == int):
        # code for tempo change
        return 0

