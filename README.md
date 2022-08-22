# netflix-&-grill

## Description

A short description explaining the what, why, and how of your project. Use the following questions as a guide:

We have created a simple date night selector application that allows two users to cycle through 10 options for movies and 6 options for cuisine types. After Profile 1 has gone through and selected their "likes" and "Dislikes" for movies they then move to cuisine types. Profile 2 will have an abbreviated array to select from based upon Profile 1's "likes". After they have matched movies and cuisine types, the application will provide a display of their matched movie and will generate a restaurant based upon their share like of cuisine type.

The code used the jquery, materialize and two APIs; IMDb and Travel Advisor. The IMDb API is used to generate an array of the top movies in theaters and we have chosen to reduce the array to the top 10 for brevity. The Travel advisor API is used to populate a restaurant based upon the cuisine types the users have agreed to. 

# User Story



## Acceptance Criteria
GIVEN I am using a application to select movies and restaurants

WHEN I open the application

THEN the a current selection of movies and cuisines are automatically displayed 

WHEN I click on the first profile

THEN I am presented with the top 10 movies in theaters

WHEN I click "Like" or "Dislike"

THEN it retains the movies I like and remove the Movies I dislike for profile 2's selection pool

WHEN I complete my selection of movies I continue clicking "Like" or "Dislike" for cuisine types

THEN it creates and array of "liked" items for profile 2 to choose from

WHEN I profile 2 clicks on a like for a movie that profile 1 has already "liked 

THEN profile 2 can continue through to select a cuisine they can click "Like" on

WHEN profile 1 and 2 have completed their selection and have a matching movie and cuisine type

THEN the screen will display the movie they both "Liked" and will generate a restaurant based upon the cuisine type and their locality

WHEN the selections have been made

THEN the saved events persist in local storage and the users have the option to clear the data.

## Technologies Used
Jquery
Materialize
IMDb API
Travel Advisor API
.css / .js / .html / images


## Snapshot

![The webpage includes a display for both movie and restaurants, buttons allow user to click and select their "like" and "dislike" of movies and cuisine types.](./assets/images/.jpg).

## Link

The link of the webpage is: https:///
