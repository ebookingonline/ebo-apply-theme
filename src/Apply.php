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

        private $assetBundleClass = "Ebooking\\Themes\\Apply\\assets\\ApplyAssets";

        /**
         * get asset bundle class object
         * @return \Ebooking\Themes\Apply\assets\ApplyAssets|object
         */
        public function getAssetBundle()
        {
            $config = [];
            return \Yii::createObject($this->assetBundleClass, $config);
        }

        /**
         * register asset bundle
         *
         * @param \yii\base\View|\yii\web\View $view
         *
         * @return static
         */
        public function register(\yii\web\View $view)
        {
            $bundle = $this->getAssetBundle();
            return $bundle::register($view);
        }
    }