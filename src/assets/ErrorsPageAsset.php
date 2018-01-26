<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-26
    | TIME   : 1:45 AM
    */

    namespace Ebooking\Themes\Apply\assets;

    /**
     * Class ErrorsPageAsset
     *
     * @package Ebooking\Themes\Apply\assets
     */
    class ErrorsPageAsset extends ApplyAssets
    {
        /** @inheritdoc */
        public function init()
        {
            // parent initialize
            parent::init();

            // remove all js
            $this->js = [];

            // remove all dependencies
            $this->depends = [
                "Ebooking\\Themes\\Apply\\assets\\PersianFontSahel",
                "yii\\bootstrap\\BootstrapAsset",
            ];
        }
    }