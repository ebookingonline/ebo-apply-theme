<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-23
    | Time   : 22:59
    */

    namespace Ebooking\Themes\Apply\assets;

    use yii\web\AssetBundle;

    /**
     * Class EbookingJsLibrariesAsset
     *
     * @package Ebooking\Themes\Apply\assets
     */
    class EbookingJsLibrariesAsset extends AssetBundle
    {
        // library js files
        public $js = [
            'libs/ebooking/main.js',
            'libs/ebooking/prototypes.js',
            'libs/ebooking/PriorityList.js',
            'libs/ebooking/hooks.js',
            'libs/ebooking/ajax.js',
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