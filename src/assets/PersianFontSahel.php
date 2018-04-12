<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-23
    | Time   : 01:11
    */

    namespace Smart\Themes\Apply\assets;

    use yii\web\AssetBundle;

    /**
     * Class PersianFontSahel
     *
     * @package Smart\Themes\Apply\assets
     */
    class PersianFontSahel extends AssetBundle
    {
        // style files
        public $css = [
            "fonts/sahel/sahel.css"
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