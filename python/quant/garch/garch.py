import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)
from matplotlib import pyplot as plt
from YahooDataFetcher import YahooDataFetcher
import datetime
import time
import numpy as np
import os
from TimeSerieConverter import TimeSerieConverter
from CalibrateGarchParams import CalibrateGarchParams
from VaRCalculator import VaRCalculator
from scipy.stats import norm


global success

def main():
	#NECESSARY DATA
	startDate = map(int, str(sys.argv[2]).split('-'))
	endDate = map(int, str(sys.argv[3]).split('-'))
	start = datetime.datetime(startDate[0], startDate[1], startDate[2])
	end = datetime.datetime(endDate[0], endDate[1], endDate[2])

	backStart = map(int, str(sys.argv[4]).split('-'))
	backEnd = map(int, str(sys.argv[5]).split('-'))
	backStartDate = datetime.datetime(backStart[0], backStart[1], backStart[2])
	backEndDate = datetime.datetime(backEnd[0], backEnd[1], backEnd[2])

	asset = sys.argv[1]
	method = sys.argv[6]
	success = False
	millis = int(round(time.time() * 1000))
	imagesFolderPath = os.path.abspath("public/images")
	filePath = imagesFolderPath + '/plot_' + str(millis) + '.png'
	quickPath = '/images/plot_' + str(millis) + '.png'
	

	timeSeries = fetchData(asset, start, end)
	try:
		logReturnsCal = calculateLogReturns(timeSeries)
		normalizedLogReturnsCal = logReturnsCal - np.mean(logReturnsCal)
		calGarchParams = CalibrateGarchParams(normalizedLogReturnsCal)
		calGarchParams.calculateGarchParams()
		garchParams =  calGarchParams.garchParams
		variances = calGarchParams.variances
	except Exception as e:
		print "Could not calculate garch params"

	try:
		timeS = fetchData(asset, backStartDate, backEndDate)
		logReturns = calculateLogReturns(timeS)
		normalizedLogReturns = logReturns - np.mean(logReturns)
		vs = np.sqrt(garch(garchParams[0], garchParams[1], garchParams[2], logReturns))
		

		if(method == "garch1"):
			vs = np.multiply(vs, np.sqrt(252))
			plot(vs, filePath)
		elif(method == "garch2"):
			varStart = datetime.datetime(backStart[0] - 6, backStart[1], backStart[2])
			varTimeSeries = fetchData(asset, varStart, backEndDate)
			varReturns = calculateReturns(varTimeSeries)
			normalReturns = calculateReturns(timeS)
			var1000Day = calculateVaR1000Day(len(normalReturns), varReturns, 99)
			varPlot(np.multiply(normalReturns, -1), var1000Day, np.multiply(vs, norm.ppf(0.99)), filePath)

		print(quickPath)
	except Exception as e:
		print "Could not calculate garch"


def calculateVaR1000Day(length, varReturns, confidenceLevel):
	returns = np.asarray(varReturns)
	var1000Day = []
	varCalculator = VaRCalculator(returns[0 : (len(returns) - length)], confidenceLevel)
	for i in range(0, length):
		varCalculator.returns = returns[0 : (len(returns) + i - length)]
		var1000Day.append(varCalculator.getThousandDayVaR())
	return var1000Day


def garch(a, b, w, y):
	try:
		yPower = np.power(y, 2)
		v_old = sum(yPower)/(len(y)-1)
		vs = np.zeros(len(y))
		vs[0] = v_old
		#For each day
		for i in range (0, len(y) - 1):
		#Calculate next variance and save the result
 			v_new = w + a * yPower[i] + b * v_old
 			vs[i+1] = v_new
			v_old = v_new
		return vs
	except Exception as e:
		print "Could not calculate garch"
	

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
	
def varPlot(timeSeries,var, garch, filePath):
	try:
		arr = np.asarray(timeSeries)
		arr2 = np.asarray(garch)
		arr3 = np.asarray(var)
		plt.bar(range(len(arr)), arr)
		plt.hold(True)
		plt.plot(arr2)
		plt.hold(True)
		plt.plot(arr3)
		plt.savefig(filePath)
	except Exception as e:
		print "Failed to save the plot, please try again soon."

def calculateReturns(timeSeries):
	try:
		tSC = TimeSerieConverter(timeSeries)
		return tSC.getNormalReturns(1, len(timeSeries))
	except Exception as e:
		print "Could not convert prices to returns."

def plot(timeSeries, filePath):
	try:
		arr = np.asarray(timeSeries)
		plt.plot(arr)
		plt.savefig(filePath)
	except Exception as e:
		print "Failed to save the plot, please try again soon."
	

main()


