# movie-picker

 Stores a to-do list of movies that you want to and have already watched.

 This vital, relationship-saving software also includes a random movie selector to cut down on the amount of time discussing what movie you should watch tonight.

## Build Setup

``` bash
# install dependencies
npm install

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Lints and fixes files
npm run lint

### Run your unit tests
npm run test:unit

```

## Configuration and Deployment
See [Configuration Reference](https://cli.vuejs.org/config/).
* use corresponding `.env.[mode]` file to configure. `.env*.local` files will be ignored by git
    - do not put secrets in env variables -- they are embedded into the build and thus can be inspected and found
    - env variables must start with `VUE_APP_`
    - [more about env and staging](https://cli.vuejs.org/guide/mode-and-env.html#example-staging-mode)
* deploy
```shell
    npm run build # minify for production
    ### fill out next steps
```


## Okta Auth
Protected by [Okta OpenId authentication](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node) to keep your guilty pleasures a secret.

Reference the injected AuthClient with `this.$auth` anywhere in the Vue instance

To protect a page, add the `requiresAuth` attribute to its route in `router/index`


### Okta and Typescript

install okta
```
npm i @okta/okta-vue
```

then install types
```
npm i @types/okta__okta-vue
```

## Other Ref
[Name That Color](http://chir.ag/projects/name-that-color/#42853E)


## App Design

### Movies
A list of all movies in the collection. Filterable by:
* watched
* rating
* genre

### Movie entity
* movie data -- pulled from google api?
* watched flag
* rating
* category -- user assigned or pulled from data?

### User operations
* search for movies using api database
* add movies to collection
* add rating to a movie in the collection
* set watched flag for movies in collection
* set favorite flag for movies in collection
* get a random unwatched movie
    - include optional filters by genre (random watched as well?)

## TO DO
**start here**
* your ids are all swizzled
    - you've got your id, imdbid and movieDbId
    - in your db/api, change imdbid -> movieDbId and store imdb too
* search:
    - add actions: details, add to collection
        * clicking a title opens details with an "Add to Collection" option
        * add fields to rate, set fave/watched and button to add
    - batch edits? ability to go through and star/check watched/rate and then click "save to collection"?
    - maybe replace simple table with datatable -- add no-results state
    - more finesse in the search field
* support tv
* add filter by genre
* simplify error/loading state -- have appModule do it all, or does filter need it?
* what does prod deployment for the app look like?
* update mock data in data.json
* test mock environment
* how to map okta user to our user model?
    - email might be the best "pk"...
* how much do we want to rely on imdb? should we store anything other than imdb id?
    - more robust to store the info (title, genre, year, etc) but not necessary
    - if we store it (or don't), we can write a script to get data from imdb and update values in db
* work out how these objects should be mapped:
    - Collection -> look into using data stored in api db
    - Movie -> CollectionItem?
    - SearchResult
        * SearchResult and CollectionItem inherit from some common base? they're v similar
    - consider making these interfaces
* CSS overhaul: consolidate css for movies and search
* work flow:
    - default: display all in own collection
    - click Favorites to filter favorites
    - click To Do to filter unwatched
    - unclicking Favorites/To Do displays all in collection
    - running a search either:
        * replaces collection with search results (swap Movies.vue for Results.vue?)
            - similar look to Movies but with a button to add the movie instead of watched/favorite flags
            - clicking a search result will open a modal w more details
        * show dropdown w basic info for each movie.
            - hover shows details
            - clicking adds the movie... idk
* add [uNoGS](https://rapidapi.com/unogs/api/unogs) to query whether or not a movie is available on netflix
* what is your data model here? what will be retrieved via api vs stored?
    - data that would need to be stored: check out `data.json`
* add a store
    - replace movies w/ results when searching
    - pass around isLoading/isErrored maybe
    - toggle favorites/unwatched views
* search function
    - display results in dropdown: whether they are in collection or not
    - on click
    - how to set error message (no results found)
* nice stuff
    - add genres:
        * mystery
    - do something with posters?
    - for a row, if click (hover?), display modal w/ poster and plot
    - add sort by genre
    - allow sort by name, year, rating, watched, favorited
* consolidate css into separate files if that makes sense
* wow yr build takes one million years... see if you can delete some unused packages or something

## DONE
* refactor to use a centralized request mgr for cleaner code -- let components just be components
* re-write to use vuetify instead of bootstrap
* nice stuff
    - how to represent genres? icons?
        horror - ghost
        scifi - death-star-variant
        action - car-sports, gun, run-fast
        comedy - emoticon-lol, emoticon-lol-outline
        drama - drama
        romance - heart-multiple
        animation - draw
        western - cowboy, cactus
        documentary - video-vintage
* typescript yo -- do some processing on movies
    - go through script and make sure you don't have dupe functions
* mocking data for development and for demo:
    - app will use `IMovieService` (and `IUserService` etc)
    - depending on environment, load either `MockMovieService` which returns static results or `MovieService` which actually talks to the backend

