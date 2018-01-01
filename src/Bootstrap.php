<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-01
    | TIME   : 11:56 PM
    */

    namespace Ebooking\Themes\Apply;

    use yii\base\Application;
    use yii\base\BootstrapInterface;

    class Bootstrap implements BootstrapInterface
    {

        /**
         * Bootstrap method to be called during application bootstrap stage.
         *
         * @param Application $app the application currently running
         */
        public function bootstrap($app)
        {
            exit(var_dump($app));
        }
    }