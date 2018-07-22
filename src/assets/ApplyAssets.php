<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-02
    | TIME   : 01:12 AM
    */

    namespace Smart\Themes\Apply\assets;


    use yii\web\AssetBundle;

    class ApplyAssets extends AssetBundle
    {
        public $theme;
        public $direction;
        public $color;
        public $language;

        public $css = [
            'css/app.css',
            'css/plugins/jquery.autocomplete.css',
            'css/plugins/select2.min.css',
            'libs/notie/dist/notie.css',
            'css/style.css'
        ];

        public $js = [
            'libs/pace-progress/pace.min.js',
            //'libs/pjax/pjax.js',
            'libs/notie/dist/notie.min.js',

            //'js/ajax.js',
            'js/plugins/jquery.autocomplete.min.js',
            'js/plugins/select2/select2.full.min.js',

            'js/common.js',
            'js/lazyload.js',
            'js/lazyload.config.js',
            'js/plugin.js',
            'js/app.js'
        ];

        public $depends = [
            "yii\\web\\JqueryAsset",
            "yii\\bootstrap\\BootstrapAsset",
            "Smart\\Themes\\Apply\\assets\\IcomoonIconsAssets",
            "Smart\\Themes\\Apply\\assets\\GlyphIconsAssets",
            "Smart\\Themes\\Apply\\assets\\SmartJsLibrariesAsset"
        ];

        public function init()
        {
            // set base path
            $this->sourcePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR;

            // set theme
            if ($this->theme)
                $this->css[] = "css/theme/{$this->theme}.css";

            // if rtl
            if ($this->direction === 'rtl')
                $this->css[] = "css/app.rtl.css";

            // add sahel font
            if (strtolower($this->language) == 'fa')
                $this->depends[] = "Smart\\Themes\\Apply\\assets\\PersianFontSahel";

            // add droid font
            if (strtolower($this->language) == 'ar')
                $this->depends[] = "Smart\\Themes\\Apply\\assets\\ArabicFontSahel";

            // add custom style at end
            $this->css[] = 'css/customize.css';

            // resetting BootstrapAsset
            \Yii::$app->assetManager->bundles['yii\bootstrap\BootstrapAsset'] = [
                'sourcePath' => $this->sourcePath,
                'css'        => ['libs/bootstrap/dist/css/bootstrap.min.css'],
                'js'         => [
                    'libs/popper.js/dist/umd/popper.min.js',
                    'libs/bootstrap/dist/js/bootstrap.min.js',
                ]
            ];

            // rsetting jquery
            \Yii::$app->assetManager->bundles['yii\web\JqueryAsset'] = [
                'sourcePath' => $this->sourcePath,
                'js'         => ['libs/jquery/dist/jquery.min.js']
            ];

            // call parent initialize
            parent::init();
        }
    }