var app = new Vue({
	el: '#app',
	data: function () {
		return {
			player: null,
			showPlayer: false,
			searchKeyword: '',
			searchResults: [],
			showSearchResults: false,
			loading:false,
			videoDialog: false,
			currentVideo: {snippet:{}}
		}
	},
	methods: {
		enablePlayer () {
			this.showPlayer = true
			this.player = new YT.Player('player', {
				height: '390',
				width: '640',
				videoId: this.currentVideo.id.videoId,
				events: {
					'onReady': this.onPlayerReady,
					'onStateChange': this.onPlayerStateChange
				}
			})
		},
		onPlayerReady(event) {
		    event.target.playVideo()
		},
		onPlayerStateChange(event) {
			if(event.data === YT.PlayerState.ENDED) {
				this.stopVideo()			
			}
		},
		stopVideo() {
			this.player.stopVideo()
		},
		search() {			
			let self = this
			this.loading = true
			let params = {
				'maxResults': '25',
				'part': 'snippet',
				'q': this.searchKeyword,
				'type': '',
				'key': 'YOUR_API_KEY'	
             }
			axios({
			  method: 'get',
			  url: 'https://www.googleapis.com/youtube/v3/search',
			  params: params
			})			
			  .then(function (response) {
			  	self.showSearchResults = true
			    self.searchResults = response.data.items
			    self.loading = false
			  })
			  .catch(function (error) {
			    console.log(error);
			    self.loading = false
			  });
		},
		showVideo(video) {
			this.videoDialog = true
			this.currentVideo = video
			this.player=null
			this.enablePlayer()
		},
		hideVideo() {
			this.videoDialog = false
			this.currentVideo = {snippet:{}}
			this.stopVideo()		
			this.player = null	
		}				
	}
})

