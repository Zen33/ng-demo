'use strict';
/**
 * @name            主配置文件
 * @description     统一定制组件
 */
define(['app'], function (app) {
    app.config(['$controllerProvider', '$translateProvider', 'currentLang', 'translations', function ($controllerProvider, $translateProvider, currentLang, translations) {
        /* 定制 jstree */
        $.jstree.defaults.core.themes.url = true;
        $.jstree.defaults.core.themes.dir = 'css/themes';
        $.jstree.defaults.core.dblclick_toggle = false;
        /* 定制国际化 */
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
        $translateProvider.translations(currentLang, translations).preferredLanguage(currentLang);
    }]);
});