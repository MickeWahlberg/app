import numpy as np
def kahan_range(start, stop, step):
    assert step > 0.0
    total = start
    compo = 0.0
    while total < stop:
        yield total
        y = step - compo
        temp = total + y
        compo = (temp - total) - y
        total = temp
        print total

#print list(kahan_range(1, 100, 0.01))[-1]

for i in np.arange(0,1,0.1):
	print i
	