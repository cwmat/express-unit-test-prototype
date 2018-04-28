# Assignment #5 - REST APIs

Charles Mateer cmateer@g.harvard.edu

Live website: http://67.205.177.107:8084

Github: https://github.com/HarvardDCENode/assignment-5-rest-apis-cwmat


The description of this assignment can be found in Canvas at [Assignment #5](https://canvas.harvard.edu/courses/35096/assignments/204793) (Spring 2018)

# Summary
For this assignment I have simplified my application.  I removed most of the previous routes in favor of a single page app which can be accessed via the nav bar (or by scrolling on the index page) above (every nav item except “About”).  Each nav item tests the different requirements for our REST API (which I also tested in Post Man - a file for which is included in my project root). 

The index page makes AJAX calls to update the list view and the drop down menus on the page.  The find, create, update, and delete buttons are also bootstrapped with AJAX based functions that make  calls to the REST API.  

I have not included extensive client-side/server-side integrity error handling for this assignment as I was more focused on error handling for the API itself.  The only main fields to be careful with are the lat/long which should be numeric.  
