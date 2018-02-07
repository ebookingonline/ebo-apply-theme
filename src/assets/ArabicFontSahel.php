<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-23
    | Time   : 01:11
    */

    namespace Ebooking\Themes\Apply\assets;

    use yii\web\AssetBundle;

    /**
     * Class ArabicFontSahel
     *
     * @package Ebooking\Themes\Apply\assets
     */
    class ArabicFontSahel extends AssetBundle
    {
        // style files
        public $css = [
            "fonts/droid/droid.css"
        ];

        /** @inheritdoc */
        public function init()
        {
            // source path
            $this->sourcePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR;

            // parent initialize
            parent::init();
        }
    }