import matplotlib.pyplot as plt
from datetime import datetime
import sys
import json
from matplotlib.dates import DateFormatter
import matplotlib.dates as mdates

def main(x, y):
    plt.figure(figsize=(len(x)*0.7, 8))
    plt.plot(x, y, 'o-', color='red')

    # Add grid
    plt.grid(True)

    # Label point on each dot
    for i, txt in enumerate(y):
        plt.annotate(txt, (x[i], y[i]), textcoords="offset points", xytext=(0,10), ha='center')

    # Add labels
    plt.xlabel('Time (HH:MM)')
    plt.ylabel('Points')
    plt.title('Point Networth (Last 24 Hours)')
    
    plt.savefig('graph.png')



if __name__ == '__main__':
    try:
        x = sys.argv[1].split(',')
        y = [int(i) for i in sys.argv[2].split(',')]
        main(x, y)
    except Exception as e:
        pass
# Y-axis: is pointAfter
# X-axis: is Timestamp