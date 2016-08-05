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
