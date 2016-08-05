# README #

I have fulfilled the said user stories and also made a query box in which any username can be entered and his details along with list of repositories will show.And when any of those repos are clicked,it fulfills the 3 basic user stories to rank the developer by contributions to a repo,by no.of followers,by no. of repos and gists.

### What is this repository for? ###

This app uses Github API to fetch user and his repositories data, and rank repositories contributors and show them in one list to fulfill following user stories:

● The rank should be filterable by amount of contributions made by developer to all
Angular repositories, by amount of followers, public repos & gists he/she published.
● We should be able to view the details page of each contributor with all repositories he contributed to and his details.
● We should be able to navigate to repository details page where we can find other
 contributors. 

### How do I get set up? ###

* Deployment instructions: Just download Github.css,Github.js and index.html files and run in any browser.

### Who do I talk to? ###

* Uzma Khan
* twitter.com/hashstagUzma  
* uzmak883@gmail.com


```
#!html5

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/css?family=Slabo+27px" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Merriweather:700" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Gravitas+One" rel="stylesheet">
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<style type="text/css">
body{
 background-color:#A0B58D;
}
.search{
 margin-top:20px;
 }
.opt{
  margin-bottom:40px;
}
button{
padding:5px;
  border:3px solid ;
  margin:2px;
  color:white;
  background-color:#C6826B;
  font-family: 'Slabo 27px', serif;
  text-transform: uppercase;
}
#ghrepo{
   text-transform: none;
  border:0px;;
  color:white;
  background-color:#25373D;
  font-family: 'Merriweather', serif;
  font-size:26.5px;
  padding:8px;
  margin-top:0px;

}
#query{
  padding:5px;
  font-family: 'Helvetica', serif;
  font-size-adjust: 0.54;
  font-size:24px;
 }
h2{
 font-family:'Righteous', cursive, 'Helvetica', serif;
  font-size:35px;
  margin-bottom:0;
}
p{
  font-size:18px;
  font-family: 'Slabo 27px', serif;
  }
h4{
 font-size:15px;
  font-family: 'Slabo 27px', serif;
  font-weight:bold;
  }
ul{
  list-style:none;
}
a,a:hover{
  text-decoration:none;
  color:#444444;
  font-size:30px;
}
.r{
  font-size:35px;
}
.c{
  font-size:18px;
}
h1{
 font-family: 'Gravitas One', cursive;
  margin-bottom:20px;
  font-size:45px;
  color:#297C74;
  text-transform:uppercase;
}
.blink,.blink:hover{
  font-size:18px;
}
.u{
  font-size:30px;
  margin-bottom:0px;
  color:#25373D;
}
</style>
<script type="text/javascript">
$(document).ready(function() {
  $("#ghrepo").click(function(e) {
    e.preventDefault();

    var usernames = [],
      userAPI = [],
      repoRank = [],
      fRank = [],
      gistRank = [];

    var query = $('#query').val();
    var giturl = 'https://api.github.com/users/' + query;
    $(".opt").addClass("hidden");
    var repourl;
    var lastContri = [];
    userplusrepo();

    function userplusrepo() { //......................user+repo func
      var userrepo;
      var html = '';

      $.getJSON(giturl + "?client_id=0d82197f3ed574b77966&client_secret=f6ebb1bde3e8e6699f69ed4058e7e1778a65c13a", function(userdata) {
        userrepo = userdata.repos_url; //API url of a user's repositories

        var fullname = userdata.name;
        var username = userdata.login;
        var aviurl = userdata.avatar_url;
        var profileurl = userdata.html_url;
        var location = userdata.location;
        var followersnum = userdata.followers;
        var followingnum = userdata.following;
        var reposnum = userdata.public_repos;
        var gistnum = userdata.public_gists;

        if (fullname == undefined) {
          fullname = username;
        }
        if (location == null) {
          location = "Not  Specified";
        }
        html = html + "<h2>" + fullname + "</h2><a href=" + profileurl + " target='_blank'><p class='u'>(@" + username + ")</p></a><img src=" + aviurl + " width='200' height='200'alt=" + username + "/>" + "<p>Followers:  " + followersnum + " - Following: " + followingnum + "<br>Repos: " + reposnum + " - Gists: " + gistnum + "</p><h4>location :" + location + "</h4>";

        $.getJSON(userrepo + "?client_id=0d82197f3ed574b77966&client_secret=f6ebb1bde3e8e6699f69ed4058e7e1778a65c13a", function(repo) {
          if (repo.length == 0) {
            html = html + '<p>No repos!</p></div>';
          } else {
            html = html + '<p class="r"><strong>Repos List:</strong></p> <ul class="repolist">';
            $.each(repo, function(index) {
              html = html + '<li><a href="' + repo[index].contributors_url + '">' + repo[index].name + '</a></li>';

            });
            html = html + '</ul></div>';
          }
          $(".Githubdata").html(html);
          $(".repolist > li a").click(function(e) { //clicking on repo to know its contributers
            e.preventDefault();
            $(".opt").removeClass("hidden");
            repourl = $(this).attr("href"); //API url for contributers to any repo
            $.getJSON(repourl + "?client_id=0d82197f3ed574b77966&client_secret=f6ebb1bde3e8e6699f69ed4058e7e1778a65c13a", function(clist) {
              lastContri.length = 0;
              userAPI.length = 0; //for clearing previous userAPI data
              for (var i in clist) {
                lastContri.push("<ul class='list'>" +
                  "<li>" + "<a href=" + clist[i].url + ">" + clist[i].login + "</a><p class='c'>(contributions: " + clist[i].contributions + ")</p></li>" +
                  "</ul>");
                userAPI.push(clist[i].url);
              } //closing for loop
              $(".Githubdata").html(lastContri);
              fRank.length = 0;
              repoRank.length = 0;
              gistRank.length = 0;
              for (var i in userAPI) {
                $.getJSON(userAPI[i] + "?client_id=0d82197f3ed574b77966&client_secret=f6ebb1bde3e8e6699f69ed4058e7e1778a65c13a", function(API) {
                  fRank.push([API.followers, "<a href=" + API.url + ">" + API.login + "</a>"]);
                  repoRank.push([API.public_repos, "<a href=" + API.url + " >" + API.login + "</a>"]);
                  gistRank.push([API.public_gists, "<a href=" + API.url + " >" + API.login + "</a>"]);
                }); //API call
              }
              clicku();
            });
          }); // clicking on any repo to know its contributers
        }); //getting repo data of same user
      }); //getting userdata of any user
    } //..............................................function userdata+repos

    function clicku() { // clicku........................
      $(".list > li a").click(function(e) { //Clicking on a username
        e.preventDefault();
        $(".opt").addClass("hidden");
        giturl = $(this).attr("href"); //API url for a user's github profile
        userplusrepo();
      }); //clicking on a username to get to his details page
    } //function clicku..................

    $(".byContri").click(function() { //Sorting by number of Contributions
      $(".Githubdata").html(lastContri);
      clicku();
    }); //Sorting by number of Contributions

    $(".byFollow").click(function() { //Sorting by number of Followers
      fRank.sort(function(a, b) {
        return a[0] - b[0];
      }).reverse();
      var ohtml = [];
      for (var i in fRank) {
        ohtml.push("<ul class='list'><li>" + fRank[i][1] + "<p class='c'>(followers: " + fRank[i][0] + ")</p></li></ul>");
      }
      $(".Githubdata").html(ohtml);
      clicku();
    }); ////Sorting by number of Followers

    $(".byRepo").click(function() { //Sorting by number of Repositories
      repoRank.sort(function(a, b) {
        return a[0] - b[0];
      }).reverse();
      var rhtml = [];
      for (var i in repoRank) {
        rhtml.push("<ul class='list'><li>" + repoRank[i][1] + "<p class='c'>(repositories: " + repoRank[i][0] + ")</p></li></ul>");
      }
      $(".Githubdata").html(rhtml);
      clicku();
    }); //Sorting by number of Repositories

    $(".byGist").click(function() { //Sorting by number of Gists
      gistRank.sort(function(a, b) {
        return a[0] - b[0];
      }).reverse();
      var ghtml = [];
      for (var i in gistRank) {
        ghtml.push("<ul class='list'><li>" + gistRank[i][1] + "<p class='c'>(gists: " + gistRank[i][0] + ")</p></li></ul>");
      }
      $(".Githubdata").html(ghtml);
      clicku();
    }); //Sorting by number of Gists

  }); //search click
});
</script>
</head>
<body>
  <div class="container text-center search">
  <h1>Github API search</h1>
<input id="query" type="text" placeholder="Enter Github username" required><br/>
<button id="ghrepo" >Get User+Repo data</button>
</div>
<br>
<div class='container text-center'>
<div class="hidden opt">
<button class="byContri">Sort by no. of Contributions</button><button class="byFollow">Sort by no. of Followers</button><button class="byRepo">Sort by no. of Repositories</button><button class="byGist">Sort by no. of Gists</button>
</div>
</div>
<div class='container '>
<div class="Githubdata">
</div>
  <footer class="text-center">Developed by <a class="blink" href="https://twitter.com/hashtagUzma" target="_blank">Uzma</a></footer>
</div>
</body>
</html>

```