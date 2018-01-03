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
        public $theme = 'light';
        public $direction = 'rtl';
        public $color = 'primary';

        public $css = [
            'css/app.min.css'
        ];

        public $js = [
            'js/app.min.js'
        ];

        public function init()
        {
            // set base path
            $this->sourcePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR;

            // set theme
            if ($this->theme) $this->css[] = "css/themes/{$this->theme}.css";

            // if rtl
            if ($this->direction === 'rtl') $this->css[] = "css/app.rtl.css";

            // call parent initialize
            parent::init();
        }
    }