var paths = {};

// Directory locations
paths.appDir = '_app/';                 // The files Gulp will work on
paths.jekyllDir = 'jekyll_source/';     // The files Jekyll will work on
paths.siteDir = '_site/';               // The resulting static site
paths.bowerComponentsDir = paths.appDir + 'bower_components/';

// Folder naming conventions
paths.postFolderName = '_posts';
paths.draftFolderName = '_drafts';
paths.imageFolderName = 'images';
paths.fontFolderName = 'fonts';
paths.vendorFolderName = 'vendor';
paths.scriptFolderName = 'scripts';
paths.mainFolderName = 'main';
paths.pageFolderName = 'page';
paths.mapFolderName = 'map';
paths.firebaseFolderName = 'firebase';
paths.stylesFolderName = 'styles';
paths.assetFolderName = 'assets';

// App files locations
paths.appStyleFiles = paths.appDir + paths.stylesFolderName;
paths.appMainStyleFiles = paths.appStyleFiles + '/' + paths.mainFolderName;
paths.appPageStyleFiles = paths.appStyleFiles + '/' + paths.pageFolderName;
paths.appMapStyleFiles = paths.appStyleFiles + '/' + paths.mapFolderName;
paths.appJsFiles = paths.appDir + paths.scriptFolderName;
paths.appMainJsFiles = paths.appJsFiles + '/' + paths.mainFolderName;
paths.appPageJsFiles = paths.appJsFiles + '/' + paths.pageFolderName;
paths.appMapJsFiles = paths.appJsFiles + '/' + paths.mapFolderName;
paths.appFirebaseJsFiles = paths.appJsFiles + '/' + paths.firebaseFolderName;
paths.appImageFiles = paths.appDir + paths.imageFolderName;
paths.appFontFiles = paths.appDir + paths.fontFolderName;
paths.appVendorFiles = paths.appDir + paths.vendorFolderName;
paths.appAssetFiles = paths.appDir + paths.assetFolderName;

// Jekyll files locations
paths.jekyllPostFiles = paths.jekyllDir + paths.postFolderName;
paths.jekyllDraftFiles = paths.jekyllDir + paths.draftFolderName;
paths.jekyllImageFiles = paths.jekyllDir + paths.imageFolderName;
paths.jekyllFontFiles = paths.jekyllDir + paths.fontFolderName;
paths.jekyllAssetFiles = paths.jekyllDir + paths.assetFolderName;

// Site files locations
paths.siteImageFiles = paths.siteDir + paths.imageFolderName;
paths.siteFontFiles = paths.siteDir + paths.fontFolderName;
paths.siteAssetFiles = paths.siteDir + paths.assetFolderName;

// Glob patterns by file type
paths.scssPattern = '/**/*.scss';
paths.cssPattern = '/**/*.css';
paths.jsPattern = '/**/*.js';
paths.imagePattern = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';
paths.markdownPattern = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.htmlPattern = '/**/*.html';
paths.xmlPattern = '/**/*.xml';
paths.allPattern = '/**/*.*';

// App files globs
paths.appStyleFilesGlob = paths.appStyleFiles + paths.stylePattern;
paths.appMainCssFilesGlob = paths.appMainStyleFiles + paths.cssPattern;
paths.appMainScssFilesGlob = paths.appMainStyleFiles + paths.scssPattern;
paths.appPageCssFilesGlob = paths.appPageStyleFiles + paths.cssPattern;
paths.appPageScssFilesGlob = paths.appPageStyleFiles + paths.scssPattern;
paths.appMapCssFilesGlob = paths.appMapStyleFiles + paths.cssPattern;
paths.appMapScssFilesGlob = paths.appMapStyleFiles + paths.scssPattern;
paths.appJsFilesGlob = paths.appJsFiles + paths.jsPattern;
paths.appMainJsFilesGlob = paths.appMainJsFiles + paths.jsPattern;
paths.appPageJsFilesGlob = paths.appPageJsFiles + paths.jsPattern;
paths.appMapJsFilesGlob = paths.appMapJsFiles + paths.jsPattern;
paths.appFirebaseJsFilesGlob = paths.appFirebaseJsFiles + paths.jsPattern;
paths.appImageFilesGlob = paths.appImageFiles + paths.imagePattern;
paths.appAssetFilesGlob = paths.appAssetFiles + paths.allPattern;

// Jekyll files globs
paths.jekyllPostFilesGlob = paths.jekyllPostFiles + paths.markdownPattern;
paths.jekyllDraftFilesGlob = paths.jekyllDraftFiles + paths.markdownPattern;
paths.jekyllHtmlFilesGlob = paths.jekyllDir + paths.htmlPattern;
paths.jekyllXmlFilesGlob = paths.jekyllDir + paths.xmlPattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;

// Site files globs
paths.siteHtmlFilesGlob = paths.siteDir + paths.htmlPattern;

// One-offs
paths.tota11y = paths.vendorFilesApp + '/tota11y.min.js';

module.exports = paths;
