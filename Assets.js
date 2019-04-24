/**
 * Co-locate the assets used by the app.
 */

var Assets = {
  ICON: 'http://codejago.com/emoto/assets/ic_sentiment_satisfied_black_48dp.png',
  ICON_SENTIMENT: 'http://codejago.com/emoto/assets/ic_sentiment_very_satisfied_black_48dp.png',
  ICON_HASHTAGS: 'http://codejago.com/emoto/assets/icons8-hashtag-52.png',
  ICON_CLASSIFICATION: 'http://codejago.com/emoto/assets/class_black_54x54.png',
  ICON_LANGUAGE: 'http://codejago.com/emoto/assets/language_black_54x54.png',
  ICON_SUMMARY: 'http://codejago.com/emoto/assets/ic_unfold_less_black_48dp.png',
  ICON_ENTITY: 'http://codejago.com/emoto/assets/ic_functions_black_48dp.png',
  getIcon: function(analysisType) {
    return (!Assets.Icons[analysisType] ? Assets.ICON : Assets.Icons[analysisType]);
  }
};
Assets.Icons = {};
Assets.Icons[AnalysisType.SENTIMENT] = Assets.ICON_SENTIMENT;
Assets.Icons[AnalysisType.HASHTAGS] = Assets.ICON_HASHTAGS;
Assets.Icons[AnalysisType.CLASS] = Assets.ICON_CLASSIFICATION;
Assets.Icons[AnalysisType.LANG_DETECT] = Assets.ICON_LANGUAGE;
Assets.Icons[AnalysisType.SUMMARY] = Assets.ICON_SUMMARY;
Assets.Icons[AnalysisType.ENTITY] = Assets.ICON_ENTITY;
Assets.Icons[AnalysisType.ENTITY_SENTIMENT] = Assets.ICON_ENTITY;
