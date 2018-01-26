<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-01
    | TIME   : 11:27 PM
    */

    namespace Ebooking\Themes\Apply;

    class Apply
    {
        const COLOR_ACCENT = 'accent';
        const COLOR_DANGER = 'danger';
        const COLOR_INFO = 'info';
        const COLOR_PRIMARY = 'primary';
        const COLOR_SUCCESS = 'success';
        const COLOR_WARN = 'warn';
        const COLOR_WARNING = 'warning';

        const THEME_DARK = 'dark';
        const THEME_LIGHT = 'light';

        const DIRECTION_RTL = 'rtl';
        const DIRECTION_LTR = 'ltr';

        public $assetBundleClass = "Ebooking\\Themes\\Apply\\assets\\ApplyAssets";

        /**
         * get asset bundle class object
         *
         * @return \Ebooking\Themes\Apply\assets\ApplyAssets|object
         * @throws \yii\base\InvalidConfigException
         */
        public function getAssetBundle()
        {
            // TODO: check user config (theme, font, ...)
            $config = [];
            return \Yii::createObject($this->assetBundleClass, $config);
        }

        /**
         * override asset bundle class
         *
         * @param $class
         * @return $this
         */
        public function setAssetBundleClass($class)
        {
            if (class_exists($class)) {
                $this->assetBundleClass = $class;
            }
            return $this;
        }

        /**
         * register asset bundle
         *
         * @param \yii\base\View|\yii\web\View $view
         * @return static
         * @throws \yii\base\InvalidConfigException
         */
        public function register(\yii\web\View $view)
        {
            $bundle = $this->getAssetBundle();
            return $bundle::register($view);
        }
    }