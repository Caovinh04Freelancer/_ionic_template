angular.module('nexengine.controllers', ['pubnub.angular.service', 'nexengine.services'])
.controller('TabCtrl', function($scope, $window, post, notification) {

})

/*****************************************************************************
///////////////////////////////// Login View ////////////////////////////////
*****************************************************************************/

.controller('SignInCtrl', function($scope, $state, login) {	
	function init() {

	}
	
	$scope.sign_in = function(username, password) {

	};
	
	init();
})

.controller('RegisterBasicNicknameCtrl', function($scope, $state, $stateParams, login, util) {
	$scope.register_basic = function(nickname) {

	}
})

.controller('RegisterBasicFullnameCtrl', function($scope, $state, $stateParams, $http, login) {
	$scope.register_basic = function(fullname) {

	}
})

.controller('RegisterBasicAvatarCtrl', function($scope, $state, $stateParams, $http, $cordovaCamera, $ionicActionSheet, login, config) {
	function _choose_image(type) {
		if(config.is_device) {
			document.addEventListener('deviceready', function () {
				var options = {
				  quality: 50,
				  destinationType: Camera.DestinationType.FILE_URI,
				  sourceType: type === 0 ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY ,
				  allowEdit: true,
				  encodingType: Camera.EncodingType.JPEG,
				  targetWidth: 128,
				  targetHeight: 128,
				  popoverOptions: CameraPopoverOptions,
				  saveToPhotoAlbum: false
				};

				$cordovaCamera.getPicture(options).then(function(imageURI) {
				  var image = document.getElementById('myImage');
				  image.src = imageURI;
				  avatarURI = imageURI;
				}, function(err) {
				  // error
					console.log('Error to get picture from device.');
				});
		  }, false);
		} 
	}
	
	$scope.register_basic = function() {

	}
	
	$scope.showActionsheet = function(i) {
		$ionicActionSheet.show({
			buttons: [
				{ text: 'Take Photo' },
				{ text: 'Choose From Library' }
			],
			cancelText: 'Cancel',
			cancel: function() {
				console.log('CANCELLED');
			},
			buttonClicked: function(index) {
				console.log('buttonClicked : ' + index);
				switch (index) {
					case 0: _choose_image(0); break;
					case 1: _choose_image(1); break;
				} 
				return true;
			}
		});
	};
})

/*****************************************************************************
///////////////////////////////// Tab Main View //////////////////////////////
*****************************************************************************/
.controller('MainCtrl', function($rootScope, $scope, $http, $ionicScrollDelegate,  $location, 
			$ionicModal, $state, $cordovaCamera, $cordovaImagePicker, 
			$timeout, $ionicActionSheet, login, main, post, config) {	
	function init() {
		///// define modal pop-up ////// 
		$ionicModal.fromTemplateUrl('popup-add-favourite.html', {
			scope: $scope,
			animation: 'slide-in-left'
		}).then(function(modal) {
			$scope.add_favourite_modal = modal;
		});
		
		$ionicModal.fromTemplateUrl('popup-create-new.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.create_post_modal = modal;
		});		
	}
	
	///// Utility ////
	$scope.getFavouriteIcon = function(fav) {
		if(fav.n === 'Home') {
			return 'ion-home';
		} else if(fav.n === 'School') {
			return 'ion-university';
		} else {
			return 'ion-ios-heart-outline';
		}
	}	

	$scope.getAvatarPath = function(filename) {
		return typeof filename === 'undefined'|| filename === null ? 'img/avatar.png' : config.nex_server_ip + 'avatar/' + filename;
	}
	
	$scope.checkTop = function() {
	}
	
	////////// Left side bar /////////////	
	$scope.clickRadarHere = function() {

	}

	$scope.clickRadarFavourite = function(id) {

	}
	
	///////////////// Favourite Modal ////////////
	$scope.openAddFavouriteModal = function() {
		$scope.add_favourite_modal.show();
	}
	
	$scope.closeAddFavouriteModal = function() {
		$scope.add_favourite_modal.hide();
	};
	
	$scope.create_radar_favourite = function(name) {

	}
		
	/////////////// Create Post Modal ////////////////
	function _take_photo() {
		if(config.is_device) {
			document.addEventListener('deviceready', function () {
				var options = {
				  quality: 100,
				  destinationType: Camera.DestinationType.FILE_URI,
				  sourceType: Camera.PictureSourceType.CAMERA,
				  allowEdit: true,
				  encodingType: Camera.EncodingType.JPEG,
				  targetWidth: 800,
				  popoverOptions: CameraPopoverOptions,
				  saveToPhotoAlbum: false
				};

				$cordovaCamera.getPicture(options).then(function(imageURI) {
					var tmp = {'img': results[i]};
					$scope.photos.push(tmp);
				}, function(err) {
				  // error
					console.log('Error to take picture from camera.');
				});
		  }, false);
		} 
	}
		
	function _get_photos() {
		var options = {
			maximumImagesCount: 5,
			width: 800,
			quality: 100
		};

		$cordovaImagePicker.getPictures(options)
		.then(function (results) {
			for (var i = 0; i < results.length; i++) {
				console.log('Image URI: ' + results[i]);
				var tmp = {'img': results[i]};
				$scope.photos.push(tmp);
			}
		}, function(error) {
			// error getting photos
			console.log('Error to get picture from device.');
		});
	}
	
	function _show_photos_actionSheet() {
		$ionicActionSheet.show({
			buttons: [
				{ text: 'Take Photo' },
				{ text: 'Choose From Library' }
			],
			cancelText: 'Cancel',
			cancel: function() {
				console.log('CANCELLED');
			},
			buttonClicked: function(index) {
				console.log('buttonClicked : ' + index);
				switch (index) {
					case 0: _take_photo(); break;
					case 1: _get_photos(); break;
				} 
				return true;
			}
		});
	}
	
	$scope.showPhotosActionSheet = function() {
		_show_photos_actionSheet();
	}
	
	$scope.openCreatePostModal = function(title, type) {
		$scope.pop_up_name = title;
		$scope.type = type;
		$scope.create_post_modal.show();
		
		if(title === 'Upload Photos Gallery') { // this is default will be upload photos.
			_show_photos_actionSheet();
		}
	}
		
	$scope.closeCreatePostModal = function() {
		// v-comment: clean up before close. have to check 
		$scope.create_post_modal.hide();
	};
	
	$scope.deleteItem = function(index) {
		$timeout( function() {
			$scope.photos.splice(index,1);
		}, 300);
	}
	
	function _create_post(message) {

	}
	
	$scope.create_post = function(message) {
		// v-comment: put-up waiting icon... 
		_create_post(message);
	}
	
	////////////// Interactive Function ////////////////
	$scope.clickLike = function(myitem) {

	};
	
	$scope.clickComment = function(myitem) { // actually go to detail page

	};

	
	$scope.clickRelay = function(myitem) {

	};
	
	////////////// Infinity Load ///////////
	$scope.load_more_post = function() {

	};
	
	init();
})


/*****************************************************************************
/////////////////////////////// Tab Notify View //////////////////////////////
*****************************************************************************/
.controller('NotifyCtrl', function($rootScope, $scope, $location, $state, login, notification, config) {

	function init() {

	}
	
	$scope.getAvatarPath = function(filename) {

	}
	
	init();	
})

/*****************************************************************************
/////////////////////////////////// Tab Me View //////////////////////////////
*****************************************************************************/
.controller('MeCtrl', function($scope, $state, $stateParams, me, login) {  
	function init() {

	}
	
	$scope.logout = function() {

	};  
	
	init();
})
.controller('me_MyProfileCtrl', function($scope, $state) {

})
.controller('me_MyPostlistCtrl', function($scope, $state, $ionicActionSheet, me, post, login, config) {
	function init() {

	}
	
	$scope.load_more_post = function() {

	}
	
	$scope.showActionsheet = function(i) {    
		$ionicActionSheet.show({
		  destructiveText: 'Delete',
		  cancelText: 'Cancel',
		  cancel: function() {
			console.log('CANCELLED');
		  },
		  destructiveButtonClicked: function() {
			console.log('DESTRUCT ' + i);
			return true;
		  }
		});
	};
	///////////////////////////////////
    
	$scope.clickComment = function(myitem) { // actually go to detail page

	};
	
	$scope.clickLike = function(myitem) {

	};
	
	init();
})
.controller('me_MyHistoryCtrl', function($scope, $state) {

})

.controller('me_SettingsCtrl', function($scope, $state, $ionicActionSheet, $cordovaCamera, me, login, config) {
	function init() {

	}
		
	$scope.check_change = function() {

	}
	
	$scope.getAvatarPath = function(filename) {
		
	}
	
	function _choose_image(type) {
		if(config.is_device) {
			document.addEventListener('deviceready', function () {
				var options = {
				  quality: 50,
				  destinationType: Camera.DestinationType.FILE_URI,
				  sourceType: type === 0 ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY ,
				  allowEdit: true,
				  encodingType: Camera.EncodingType.JPEG,
				  targetWidth: 128,
				  targetHeight: 128,
				  popoverOptions: CameraPopoverOptions,
				  saveToPhotoAlbum: false
				};

				$cordovaCamera.getPicture(options).then(function(imageURI) {
				  var image = document.getElementById('myImage');
				  image.src = imageURI;
				  // upload immediately - call 
					login.register_basic_avatar(imageURI, function (data) {		
						console.log("Upload avatar success");
					});
				}, function(err) {
				  // error
					console.log('Error to get picture from device.');
				});
		  }, false);
		} 
	}
	
	$scope.showActionsheet = function(i) {
		$ionicActionSheet.show({
			buttons: [
				{ text: 'Take Photo' },
				{ text: 'Choose From Library' }
			],
			cancelText: 'Cancel',
			cancel: function() {
				console.log('CANCELLED');
			},
			buttonClicked: function(index) {
				console.log('buttonClicked : ' + index);
				switch (index) {
					case 0: _choose_image(0); break;
					case 1: _choose_image(1); break;
				} 
				return true;
			}
		});
	};
	
	$scope.update_profile_basic = function() {

	}
	
	init();
})
.controller('me_SettingsChangepasswordCtrl', function($scope, $state, $window, me, login) {
	$scope.check_change = function() {

	}
	
	$scope.change_my_password = function() {

	}
})
.controller('me_PolicyCtrl', function($scope, $state) {

})
.controller('me_HelpCtrl', function($scope, $state) {

})


/*****************************************************************************
/////////////////////////////////// Detail Controller ////////////////////////
*****************************************************************************/

.controller('DetailCtrl', function($scope, $state, $stateParams, $http, $ionicModal, config, login, main, post) {
	function isMyPost(ownerid) {

	}

	function init() {

	}
	
	$scope.getAvatarPath = function(filename) {

	}
	
	$scope.getPhotosPath = function(owner_id, filename) {

	}
	
	$scope.getHeaderTitle = function() {

	}
	
	//////// Interactive /////////////
	$scope.clickLike = function(myitem) {

	};
	
	$scope.clickRelay = function(myitem) {

	};
	
	$scope.clickComment = function(id) {

	};
	
	$scope.submitComment = function(comment) {

	};
	
	//////////////////////////////////
	$scope.openCommentDetailModal = function(comment) {

	}
	
	$scope.closeCommentDetailModal = function() {

	}
	
	$scope.gotoProfile = function(id) {

	}
	
	init();
})

/*****************************************************************************
/////////////////////////////////// Profile Controller ///////////////////////
*****************************************************************************/


.controller('ProfileCtrl', function($scope, $state, $stateParams, login, profile, config) {
	$scope.getAvatarPath = function(filename) {

	}
	
	$scope.getProfileName = function() {

	}
	
	$scope.load_more_post = function() {
	
	}
})
