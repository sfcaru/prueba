liveblogSyndication
    .directive('lbIngestPanel',
        ['IngestPanelActions', 'Store', 'IngestPanelReducers', '$routeParams',
        function(IngestPanelActions, Store, IngestPanelReducers, $routeParams) {
            return {
                templateUrl: 'scripts/liveblog-syndication/views/ingest-panel.html',
                link: function(scope) {
                    scope.store = new Store(IngestPanelReducers, {
                        consumerBlogId: $routeParams._id,
                        syndicationIn: {},
                        producers: {},
                        producerBlogs: {},
                        modalActive: false,
                        localProducerBlogIds: [],
                        locallySyndicatedItems: []
                    });

                    scope.store.connect(function(state) {
                        scope.syndicationIn = state.syndicationIn;
                        scope.locallySyndicatedItems = state.locallySyndicatedItems;
                        scope.modalActive = state.modalActive;
                    });

                    IngestPanelActions.getSyndication();

                    scope.openSyndBlogsModal = function() {
                        IngestPanelActions.toggleModal(true);
                    }
                }
            };
        }]);
