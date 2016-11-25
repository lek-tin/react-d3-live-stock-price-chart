#Live timeseries chart based on real-time in-coming stock data from backend

## Getting started
1. Go to the root directory, run `npm install`;    
3. When the installation is complete, run `npm start` to start the node server in the backgound
4. Then open another new terminal window, run `webpack --watch` to transpile React/ES6 JavaScript to `bundle.js`;  
5. Now you can use the application on [localhost:4000](http://localhost:4000/)

## Notes
I tried to use Google Finance api to update the chart, however the data it provides `bid`, `bid size`, `ask`, `ask size` and such data. And also it keeps denying my visit after using a single IP for a while, then I went to do some research only to find that [Google Finance API](https://developers.google.com/finance/) has deprecated. In the end I had a build the backend API to feed data to frontend which  added some extra pressure on the deadline. In any case, below are some advantages/drawbacks of this basic working model,

## Advantages
1. Even when the server is disconnected, the application is still trying to connect;
2. Chart is responsive on window resizing;
3. User can turn off centain stocks either by clicking on the checkbox next to a quote, or by click on the label at the bottom of the chart.

## Improvements
1. Lines on the chart can be styled to be curved for better visual effect;
2. Chart flashes when upon loading new data / updating itself, it is quite dramatic especially when the chart refreshes every 0.5 seconds.
3. This chart doesn't retain memory for the time before when the page is loaded;
4. Legend colors are not mapping to the labels;
5. Each row that is being updated should flash for a short period of time;
6. The overall design can be brushed up a little bit of course :)