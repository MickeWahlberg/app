import math

class TimeSerieConverter:

    def __init__(self, timeSerie):
        self.timeSerie = timeSerie

    def getLogReturns(self, start, end):
        logReturns = []
        for i in range(start, end):
        	logReturns.append(math.log((self.timeSerie[i] / self.timeSerie[i-1])))
        return logReturns

