import math

class TimeSerieConverter:

	def __init__(self, timeSerie):
		self.timeSerie = timeSerie

	def getLogReturns(self, start, end):
		logReturns = []
		for i in range(start, end):
			logReturns.append(math.log((self.timeSerie[i] / self.timeSerie[i-1])))
		return logReturns

	def getNormalReturns(self, start, end):
		returns = []
		for i in range(start, end):
			returns.append(float(self.timeSerie[i]) / float(self.timeSerie[i-1]) - 1)
		return returns    	

