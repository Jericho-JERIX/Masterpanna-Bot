import matplotlib.pyplot as plt
from datetime import datetime
import sys
import json
from matplotlib.dates import DateFormatter
import matplotlib.dates as mdates

def main(x, y1, y2):
    plt.figure(figsize=(len(x)*0.7, 4))
    plt.plot(x, y1, 'o-', color='red')
    plt.plot(x, y2, 'o-', color='gray')

    # Make legend for y1 and y2
    plt.legend(['Your Point', 'Average Point'])

    # Add grid
    # plt.grid(True)

    # Label point on each dot
    for i, txt in enumerate(y1):
        plt.annotate(txt, (x[i], y1[i]), textcoords="offset points", xytext=(0,10), ha='center')
    for i, txt in enumerate(y2):
        plt.annotate(txt, (x[i], y2[i]), textcoords="offset points", xytext=(0,10), ha='center')

    # Add labels
    plt.xlabel('Time (HH:MM)')
    plt.ylabel('Points')
    plt.title('Point Networth (Last 24 Hours)')
    
    plt.savefig('graph.png')



if __name__ == '__main__':
    try:
        x = sys.argv[1].split(',')
        y1 = [int(i) for i in sys.argv[2].split(',')]
        y2 = [float(i) for i in sys.argv[3].split(',')]
        main(x, y1, y2)
    except Exception as e:
        print(e)
# Y-axis: is pointAfter
# X-axis: is Timestamp