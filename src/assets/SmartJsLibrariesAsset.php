<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-23
    | Time   : 22:59
    */

    namespace Smart\Themes\Apply\assets;

    use yii\web\AssetBundle;

    /**
     * Class SmartJsLibrariesAsset
     *
     * @package Smart\Themes\Apply\assets
     */
    class SmartJsLibrariesAsset extends AssetBundle
    {
        // library js files
        public $js = [
            'libs/smart/main.js',
            'libs/smart/prototypes.js',
            'libs/smart/PriorityList.js',
            'libs/smart/hooks.js',
            'libs/smart/ajax.js',
        ];

        // dependencies
        public $depends = [
            'yii\web\JqueryAsset'
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