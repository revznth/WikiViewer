$(document).ready(function() {
    var elem = document.getElementById("search_input");

    // Check to see if the 'Enter' key was released
    elem.onkeyup = function(e) {
        if (e.keyCode == 13) {
            var limit = 15; // TODO: make this a user choice
            var search_term = get_search_term();
            // var res = search_wikipedia(search_term, limit);
            // var pages = return_pages(res);
            // display_search_results(pages);
            // search_wikipedia(search_term, limit);

            // var res = search_wikipedia(search_term, limit);
            // console.log(res);
            // display_search_results(pages);
            search_wikipedia(search_term, limit);
        }
    }
});

function search_wikipedia(keyword, limit) {
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json"
    url += "&gsrlimit=" + limit;
    url += "&generator=search&origin=*&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
    url += keyword;

    return $.getJSON(url, function(json) {
        var pages = return_pages(json);
        display_search_results(pages);
    });
    // $.getJSON(url, function(json) { console.log(json.query.pages); });
}

function get_search_term() {
    return $("#search_input").val();
}

function return_pages(response) {
    return response.query.pages;
}

function display_search_results(pages) {
    var html = "";

    for (page in pages) {
        html += "<div class=\"row\"><div class=\"col-sm-8 offset-sm-2\"><div class='result'><h2>";
        html += pages[page].title;
        html += "</h2>";
        html += "<p class='extract'>" + pages[page].extract + "</p>";
        html += "<a href='https://en.wikipedia.org/?curid=";
        html += pages[page].pageid + "' target='_blank'>";
        html += "Go to article</a>";
        html += "</div></div></div>";
    }

    $("#search-results").html(html);
}

// Print message on submission
function print_message(message) {
    var html = "<div class=\"row\"><div class=\"col-sm-4 offset-sm-4\"><p>";
    html += message;
    html += "</p></div></div>";

    $("#search-results").html(html);
}

function get_wiki_main_page() {
    var method = 'POST';
    var wiki_api = "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&origin=*";

    $.getJSON(wiki_api, function(json) {
        var html = "";

        var json_string = JSON.stringify(json, undefined, 2);
        print_message(json_string);
    });
}