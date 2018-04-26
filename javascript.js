var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Nepal!',
    player: null,
    done: false
  },
	methods: {
		onPlayerReady(event) {
		    event.target.playVideo()
		},
		onPlayerStateChange(event) {
			if(event.data === YT.PlayerState.ENDED && !this.done) {
				this.stopVideo()	
				this.done = true			
			}
			if (event.data == YT.PlayerState.PLAYING && !this.done) {
			  setTimeout(this.stopVideo, 6000)
			  this.done = true
			}
		},
		stopVideo() {
			this.player.stopVideo()
		}					
	},
  created() {
	window.onYouTubeIframeAPIReady = () => {
		this.player = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: 'M7lc1UVf-VE',
			events: {
			'onReady': this.onPlayerReady,
			'onStateChange': this.onPlayerStateChange
			}
		})
    }
  },
})