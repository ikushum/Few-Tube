var app = new Vue({
	el: '#app',
	data: function () {
		return {
			player: null,
			done: false,
			showPlayer: false,
			searchKeyword: '',
			searchResults: [],
			showSearchResults: false
		}
	},
	methods: {
		enablePlayer () {
			this.showPlayer = true
			this.player = new YT.Player('player', {
				height: '390',
				width: '640',
				videoId: 'M7lc1UVf-VE',
				events: {
					'onReady': this.onPlayerReady,
					'onStateChange': this.onPlayerStateChange
				}
			})
		    console.log(this.player)
		},
		initGoogleApi () {
		  gapi.client.init({
		    'apiKey': 'YOUR_API_KEY',
		    // clientId and scope are optional if auth is not required.
		    'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
		    'scope': 'profile',
		  }).then(function() {
		    // 3. Initialize and make the API request.
		    return gapi.client.request({
		      'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
		    })
		  }).then(function(response) {
		    console.log(response.result);
		  }, function(reason) {
		    console.log('Error: ' + reason.result.error.message);
		  });

		},
		onPlayerReady(event) {
		    event.target.playVideo()
		},
		onPlayerStateChange(event) {
			if(event.data === YT.PlayerState.ENDED && !this.done) {
				this.stopVideo()	
				this.done = true			
			}
		},
		stopVideo() {
			this.player.stopVideo()
		},
		search() {			
			let self = this
			let params = {
				'maxResults': '25',
				'part': 'snippet',
				'q': this.searchKeyword,
				'type': '',
				'key': 'AIzaSyARPz0pMc-wmIlVwCtFF26pIOBRX_5oYik'	
             }
			axios({
			  method: 'get',
			  url: 'https://www.googleapis.com/youtube/v3/search',
			  params: params,
			  headers: {'X-ApiKey': 'AIzaSyARPz0pMc-wmIlVwCtFF26pIOBRX_5oYik'}
			})			
			  .then(function (response) {
			  	self.showSearchResults = true
			    self.searchResults = response.data.items
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		}					
	}
})

