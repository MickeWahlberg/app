from pandas_datareader import data

class YahooDataFetcher:

    def __init__(self, symbol, source, start, end):
        self.symbol = symbol
        self.source = source
        self.start = start
        self.end = end

    def get_time_series_data(self):
        time_series_data = \
            data.DataReader('^'+self.symbol, self.source, self.start, self.end)
        return time_series_data

    def get_adj_close_time_series_data(self):
        time_series_data = \
            data.DataReader(self.symbol, self.source, self.start,
                            self.end).get('Adj Close')
        return time_series_data

    def get_volume_time_series_data(self):
        time_series_data = \
            data.DataReader('^'+self.symbol, self.source, self.start, self.end).get("Volume")
        return time_series_data

