/**
 * NewPostController
 * @namespace thinkster.posts.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.posts.controllers')
        .controller('NewPostController', NewPostController);

    NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts'];

    /**
     * @namespace NewPostController
     */
    function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts) {
        var vm = this;

        vm.submit = submit;

        /**
         * @name submit
         * @desc Create a new post
         * @memberOf thinkster.posts.controllers.NewPostController
         */
        function submit() {
            $rootScope.$broadcast('post.created', {
                content: vm.content,
                author: {
                    username: Authentication.getAuthenticatedAccount().username
                }
            });

            $scope.closeThisDialog();

            Posts.create(vm.content).then(createPostSuccessFn, createPostErrorFn);
        }

        /**
         * @name createPostSuccessFn
         * @desc Show snackbar with success message
         */
        function createPostSuccessFn(data, status, header, config) {
            Snackbar.show('Success! Post created.');
        }

        /**
         * @name createPostErrorFn
         * @desc Propogate error event and show snackbar with error message
         */
        function createPostErrorFn(data, status, header, config) {
            $rootScope.$broadcast('post.create.error');
            Snackbar.error(data.error);
        }
    }
})();
