from matplotlib import pyplot as plt
import sys
from YahooDataFetcher import YahooDataFetcher
import datetime
import time
import numpy
import os
from TimeSerieConverter import TimeSerieConverter
import calibrateGarchParameters

global success

def main():
	#NECESSARY DATA
	startDate = map(int, str(sys.argv[2]).split('-'))
	endDate = map(int, str(sys.argv[3]).split('-'))
	start = datetime.datetime(startDate[0], startDate[1], startDate[2])
	end = datetime.datetime(endDate[0], endDate[1], endDate[2])
	asset = sys.argv[1]
	success = False
	millis = int(round(time.time() * 1000))
	imagesFolderPath = os.path.abspath("../../public/images")
	filePath = imagesFolderPath + '/plot_' + str(millis) + '.png'
	quickPath = '/images/plot_' + str(millis) + '.png'
	

	timeSeries = fetchData(asset, start, end)
	logReturnsCal = calculateLogReturns(timeSeries)
	normalizedLogReturnsCal = logReturnsCal - numpy.mean(logReturnsCal)
	calibrateGarchParameters.getGarchParams(normalizedLogReturnsCal)
	plot(timeSeries, filePath)

def fetchData(asset, start, end):
	try:
		data = YahooDataFetcher(str(asset), 'yahoo', start, end)
		ts = data.get_adj_close_time_series_data()
		return ts
	except Exception as e:
		print "Could not find the asset " + asset + "."

def calculateLogReturns(timeSeries):
	try:
		timeSerieConverter = TimeSerieConverter(timeSeries)
		return timeSerieConverter.getLogReturns(1, len(timeSeries))
	except Exception as e:
		print "Could not convert prices to returns."
	

def plot(timeSeries, filePath):
	try:
		timeSeries.plot()
		plt.savefig(filePath)
	except Exception as e:
		"Failed to save the plot, please try again soon."
	

main()


