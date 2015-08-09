angular.module('nexengine.services', ['pubnub.angular.service'])
.service('config', function(){
	this.is_localhost = false;
	this.is_device = false;
	this._server_ip = (this.is_localhost == false) ? 'http://127.0.0.1:5000/' : 'http://127.0.0.1:5000/';
	this._api = {}; 
	this._current = {};
	
	this.is_debug = {
		'service_post' : true,		
		'service_profile' :  true,
		'service_login' :  true,
		'service_main' :  true,
		'service_notification' :  true,
		'service_me' :  true
	}
})

.service('util', function(config){
	this.is_null = function(value) {
		return typeof value == 'undefined' || value == null;
	}
	
	this.is_blank = function(string) {
		return typeof string == 'undefined' || string == null || string == '';
	}
})

.service('vlog', function(config){
	this.log = function(msg) { // same as console but we make it as one clue for easier deal with.
		console.log(msg);
	}
	
	this.info = function(msg, module) {
		if(config.is_debug[module]) console.log('[INFO]' + msg);
	}
	
	this.error = function(err) {
		console.log('[ERROR]' + err);
	}
})

/*****************************************************************************
///////////////////////////////// "post" /////////////////////////////////////
*****************************************************************************/
.service('post', function($rootScope, $http, $cordovaFileTransfer, me, config, vlog){
	/***  private functions ***/ 
	function _serialize(obj) {
		var str = [];
		for(var p in obj){
			if (Array.isArray( obj[p])) {
				for(var i in obj[p])
					str.push(encodeURIComponent(p) + '[]=' + encodeURIComponent(obj[p][i]));
			} else {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
			}
		}
		return str.join('&');
	}
	
	this.get_latest_post_list = function(token, channels, from_id, callback) {

	}
	
	this.upload_post_photo = function(img_uri, token, callback) {

	}
		
	this.create_post = function(message, token, current_channel, post_type, photos, callback) {

	}
	
	this.create_post_like = function(id, token, callback) {

	}
	
	this.create_post_relay = function(id, token, current_channel, callback) {

	}
	
	this.create_post_comment = function(id, comment, token, callback) {

	}
	
	this.create_question_answer = function(id, comment, token, callback) {

	}
	
	this.get_post_detail = function(id, token, callback) {

	}

})

/*****************************************************************************
///////////////////////////////// "login" ////////////////////////////////////
*****************************************************************************/
.service('login', function($rootScope, $http, $window, $cordovaFileTransfer, config, main, notification, vlog){

	/***  private functions ***/ 
	function _serialize(obj) {
		var str = [];
		for(var p in obj){
			if (Array.isArray( obj[p])) {
				for(var i in obj[p])
					str.push(encodeURIComponent(p) + '[]=' + encodeURIComponent(obj[p][i]));
			} else {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
			}
		}
		return str.join('&');
	}
	
	this.checklogin = function() {

	}
	
	this.signinup = function(username, password, uuid, $scope){

	}
	
		
	this.change_my_password = function(token, old_password, new_password, callback) {

	}
	
	this.register_basic_nickname = function(id, nickname, callback) {

	}
		
	this.register_basic_fullname = function(fullname, callback) {

	}
	
	this.register_basic_avatar = function(avatarURI, callback) {

	}
	
	this.change_my_basic_nickname = function(token, name, callback) {

	}
	
	this.change_my_basic_fullname = function(token, name, callback) {

	}
		
	this.init = function(callback) {

	}
	
	this.logout = function() {

	}

})

/*****************************************************************************
///////////////////////////////// "main" /////////////////////////////////////
*****************************************************************************/
.service('main', function($rootScope, $http, $cordovaGeolocation, PubNub, config, post, vlog){
	this.clear = function() {

	}
	
	this.update_fav_list = function(list) {

	}
	
	function _updatePostList(text, is_update) {

	}

	
	this.clear_radar = function(radar_callback) {

	}
	
	this.load_more_post = function(token, callback) {

	}
	
	this.init_radar_here = function(token, callback) {

	}

	this.init_radar_fovourite = function(token, id, callback) {	// favourite

	}
	
	/***  private functions ***/ 
	function _serialize(obj) {
		var str = [];
		for(var p in obj){
			if (Array.isArray( obj[p])) {
				for(var i in obj[p])
					str.push(encodeURIComponent(p) + '[]=' + encodeURIComponent(obj[p][i]));
			} else {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
			}
		}
		return str.join('&');
	}
	
	this.create_radar_favourite = function(name, token, callback) {

	}
})

/*****************************************************************************
////////////////////////////// "notification" ////////////////////////////////
*****************************************************************************/
.service('notification', function($rootScope, $http, $window, config, vlog){
	this.clear = function() {
		self.list = [];
	}
	
	this.update_last_notification_id = function() {	
	}
	
	function _unshift_groupby(n) {

	}
	
	function _notification_list(token) {

	}
	
	this.notification_viewed = function(token, id) {

	}
	
	this.init = function(token) {

	}
	
	this.stop = function() {

	}
})

/*****************************************************************************
////////////////////////////////////// "me" //////////////////////////////////
*****************************************************************************/
.service('me', function($rootScope, $http, config){
	this.get_my_profile_header = function(token, callback) {

	}
	
	this.get_my_post_list = function(token, callback) {

	}
	
	this.add_to_my_post_list = function(post) {

	}
	
	/***  private functions ***/ 
	function _serialize(obj) {

	}

	
})


/*****************************************************************************
///////////////////////////////// "profile" //////////////////////////////////
*****************************************************************************/
.service('profile', function($rootScope, $http, config, vlog){
	this.get_profile_header = function(token, id, callback) {

	}
	
	this.get_profile_post_list = function(token, id, benchmark_id, callback) {

	}
});
