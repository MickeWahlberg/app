import numpy as np

class VaRCalculator:
	def __init__(self, returns, confidenceLevel):
		self.returns = returns
		self.confidenceLevel = confidenceLevel

	def calculateVaR(self, returns):
		return np.percentile(returns, self.confidenceLevel)

	def getThousandDayVaR(self):
		return self.calculateVaR(self.returns[-1000:])

	def get500DayVaR(self):
		return self.calculateVaR(self.returns[-500:])

	def getVaR(self, periodLength):
		return self.calculateVaR(self.returns[-periodLength:])