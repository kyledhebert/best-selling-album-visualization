# Visualizing Best Selling Albums
The code in this repo demonstrates the use of [D3.js][d3js], and [Flask][flask] to visualize best selling album data scraped from the [List of Best-selling Albums Wikipedia entry][wiki].

## Installing Dependencies
The first step in running the app is installing the dependencies, ideally in a virtual environment.

Once you have activated your virtual environment you can use the `requirements.txt` file in the project root to install the dependencies:

`$ pip install -r requirements.txt`

## Seeding MongoDB with the data
This application uses [MongoDB][mongodb] to store the data. If you do not have MongoDB installed on your machine please visit the Mongo site for details on installing Mongo before continuing.

Once Mongo is installed and running on your machine you can seed the database with the album dataset using `db_helper.py`.

From the project root run this command to seed the database:
`$ python db_helper.py seed_db`

You can drop the database if needed using:
`$ python db_helper.py drop_db`

## The Visualization
The files for the visualization itself are in the `visualization` directory.

### Running the Visualization
The visualization uses the MongoDB database created above and an [Eve][eve] RESTful API to serve the data. You will need to start both the API and the web application to view the visualization. Make sure that Mongo is still running as well.

First start the Eve server by running this command from the `visualization/api` directory:

`$ python server_eve.py`

The API will now be running on localhost on the default port (5000).

Now that the API server is running you may start the Flask application server from the `visualization/app` directory:

`$ python album_viz.py`

If you visit `http://localhost:8080` in your browser you should see the visualization running.

##The Data
The data used for this project was scraped from the Wikipedia entry using a [Scrapy][scrapy] spider. You can view the spider code in the `album_scraper` directory. In order to run the scraping code, you will need to install the additional dependencies listed in `album_scraper/requirements.txt`

The `data` directory includes the raw data that was scraped using the spider. I used the [Pandas][pandas] library to clean up the data before importing it into the database. The files in the `data` directory show the various stages the data went through before import. 

[d3js]: https://d3js.org/
[mongodb]: https://www.mongodb.com/download-center?jmp=nav
[flask]: http://flask.pocoo.org/
[pandas]: http://pandas.pydata.org/
[eve]: http://python-eve.org/index.html
[scrapy]: https://scrapy.org/
[wiki]: https://en.wikipedia.org/wiki/List_of_best-selling_albums
