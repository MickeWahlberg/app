import numpy as np
from numpy.linalg import inv

stocks = MarketData(:,1:10)
# Returns
y = np.divide(stocks[1:,:], stocks[:-1,:])
#y = stocks[2:end, :]./stocks(1:(end-1), :)

V0SS = 100
V0NSS = 100
V0Equal = 100
V0Sharpe = 100
l = len(y)
weightsSS = np.zeros((10, l-101))
weightsNSS = np.zeros((10, l-101))
m0 = 1.0025
portfolio = np.zeros((4, 898))
exitFlags = zeros((1, 898))

for t in range(100:l):
#for t = 101:l

 column = t - 100
 # Returns
 m = np.mean(y[t-101:t-1,:])
 # Portfolio covariance, variance, and volatility
 portfolioCov = np.cov(y[t-101:t-1,:])
 portfolioVariance = np.diag(portfolioCov)
 portfolioVolatility = np.sqrt(portfolioVariance)
 #Estimate parameters
 s = len(portfolioCov)
 I = np.ones((s,1))
 # For same dimensions as in notes
 m = np.transpose(m)
 A = np.multiply(np.multiply(np.transpose(I), inv(portfolioCov)),  I)
 B = I' / portfolioCov * m
 C = m' / portfolioCov * m
 D = A * C - B^2

 # Short selling
 weightsSS(:, column) = ((A * m0 * V0SS - B * V0SS) / D) * (portfolioCov\ m) + ((C * V0SS - B * m0 * V0SS) / D) * (portfolioCov \ I)
 # NO short selling
 if min(m) > m0
 weightsNSS(:, column) = (m == min(m)).*V0NSS
 elseif max(m) < m0
 weightsNSS(:, column) = (m == max(m)).*V0NSS
 else
 weightsNSS(:, column) = quadprog(portfolioCov, [], [], [], [I'm'],
[V0NSSm0*V0NSS], zeros(s, 1))
 end

 weightsEqual = ones(1,10) * V0Equal / 10
 weightsSharpe= V0Sharpe * (m' / portfolioCov) / ((I' / portfolioCov) *
m)


 V0SS = sum(weightsSS(:, column)' .* y(t, :))
 V0NSS = sum(weightsNSS(:, column)' .* y(t, :))
 V0Equal = sum(weightsEqual .* y(t, :))
 V0Sharpe = sum(weightsSharpe .* y(t, :))

 portfolio(:,column) = [V0SSV0NSSV0EqualV0Sharpe]
end
portfolio100 = portfolio(:, 1:100:end)
percentageWeights = weightsNSS./sum(weightsNSS)
