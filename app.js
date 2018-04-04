




// YOUTUBE SEARCH
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi (searchTerm, callback) {
	const query = {
		q: searchTerm,
		part: 'snippet',
		key: 'AIzaSyBX5_8U_si2ymJJmNAGzJMbTYJOiUSLe8w',
		type: 'video',
		maxResults: 5
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result, index) {
	var link = 'https://www.youtube.com/watch?v=' + result.id.videoId
  return `
    <div>
    	<a class="js-result-name" href="${link}" target="_blank">
     		<h2>Title: ${result.snippet.channelTitle}</h2>
     		<img src="${result.snippet.thumbnails.medium.url}">
     	</a>

 
    </div>
  `;
}

// function renderResult(result) {
//   return `
//     <div>
//       <h2>
//       <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
//       <p>Number of watchers: <span class="js-watchers-count">${result.watchers_count}</span></p>
//       <p>Number of open issues: <span class="js-issues-count">${result.open_issues}</span></p>
//     </div>
//   `;
// }

// function displayGitHubSearchData(data) {
//   const results = data.items.map((item, index) => renderResult(item));
//   $('.js-search-results').html(results);
// }

function displayYouTubeSearchData(data) {
	console.log(data);
  	const resultArray = data.items.map(renderResult);
  $('.js-search-results').html(resultArray);
}


function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(this).find('.js-query');
    const query = queryTarget.val();
    console.log(query);
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);