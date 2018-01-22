<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-02
    | TIME   : 01:12 AM
    */

    namespace Ebooking\Themes\Apply\assets;


    use yii\web\AssetBundle;

    class ApplyAssets extends AssetBundle
    {
        public $theme = 'success';
        public $direction = 'rtl';
        public $color = 'primary';

        public $css = [
            'css/app.css'
        ];

        public $js = [
            'libs/pace-progress/pace.min.js',
            'libs/pjax/pjax.js',

            'js/nav.js'
        ];

        public $depends = [
            "yii\\web\\JqueryAsset",
            "yii\\bootstrap\\BootstrapAsset",
            "Ebooking\\Themes\\Apply\\assets\\IcomoonIconsAssets",
            "Ebooking\\Themes\\Apply\\assets\\PersianFontSahel",
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

            // add custom style at end
            $this->css[] = 'css/style.css';

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