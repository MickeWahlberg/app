import numpy as np
import math
from decimal import * 

def MLE(w, a, b, y):
 	n = len(y)
 	variance = 0
 	for i in range(0, n):
		variance += np.power(y[i], 2) / (n-1)
	
	terms = np.zeros(n)
	variances = np.zeros(n)
	variances[0] = variance

	for t in range(0, n-2):
		variance = w + a * np.power(y[t], 2) + b * variance
		terms[t] = math.log(variance) + np.power(y[t+1], 2) / variance;
		variances[t+1] = variance;
	value = -0.5 * sum(terms);
	#print value
	np.append(variances, value)
	return value





def getGarchParams(y_cal):
	old_value = 0.1
	new_value = 0
	max_w = 0
	max_a = 0
	max_b = 0
	x = 1
	#Starting bounds for omega
	w_low = math.pow(10, -10)
	w_high = 1
	#Starting bounds for alpha
	a_low = 0
	a_high = 1
	#Starting bounds for beta
	b_low = 0
	b_high = 1
	#Starting step_length
	step = 0.5
	Values = []
	
	#While the old best value and new best value are equal within 5 decimals
	while (old_value - new_value > 0.001):
		for w in np.arange(w_low,w_high, step):
			for a in np.arange(a_low, a_high, step):
				for b in np.arange(b_low, np.minimum((1-a), b_high), step):

	 				#Calculate MLE 
	 				new_value = MLE(w,a,b,y_cal)
	 				#new_value = variances[len(variances) - 1]
					#np.delete(variances, len(variances) - 1, 0)

	 				#If larger MLE value found, save parameters and value
					if (new_value > old_value):
						print new_value
						print old_value
			 			max_w = w
						max_a = a
						max_b = b
						old_value = new_value

	 	#Set new upper bounds
		w_high = min(1, max_w + step)
		a_high = min(1, max_a + step)
		b_high = min(1, max_b + step)

		#Set new lower bounds
		w_low = max(math.pow(10, -10), max_w - step)
		a_low = max(0, max_a - step)
		b_low = max(0, max_b - step)

		x = x + 1
		#Make step smaller
		step = step/1.1
	print max_a
	print max_b
	print max_w

