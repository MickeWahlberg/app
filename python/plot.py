from matplotlib import pyplot as plt
import sys
from YahooDataFetcher import YahooDataFetcher
import datetime
import time
import os

startDate = map(int, str(sys.argv[2]).split('-'))
endDate = map(int, str(sys.argv[3]).split('-'))
start = datetime.datetime(startDate[0], startDate[1], startDate[2])
end = datetime.datetime(endDate[0], endDate[1], endDate[2])
asset = sys.argv[1]
sucess = False
millis = int(round(time.time() * 1000))
imagesFolderPath = os.path.abspath("../public/images")
filePath = imagesFolderPath + '/plot_' + str(millis) + '.png'
print filePath
quickPath = '/images/plot_' + str(millis) + '.png'
#try:
data = YahooDataFetcher(str(sys.argv[1]), 'yahoo', start, end)
ts = data.get_adj_close_time_series_data()
ts.plot()
plt.savefig(filePath)
sucess = True
print(quickPath)
#except Exception as e:
print("Could not find the asset " + asset + ".")
sucess = False

print(sucess)

