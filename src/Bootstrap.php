<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-01
    | TIME   : 11:56 PM
    */

    namespace Smart\Themes\Apply;

    use yii\base\Application;
    use yii\base\BootstrapInterface;

    /**
     * Class Bootstrap
     * @package Smart\Themes\Apply
     */
    class Bootstrap implements BootstrapInterface
    {
        /**
         * Bootstrap method to be called during application bootstrap stage.
         *
         * @param Application $app the application currently running
         */
        public function bootstrap($app)
        {
            // make apply theme class as singleton
            \Yii::$container->setSingleton("Smart\\Themes\\Apply\\Apply");

            // add apply theme alias
            \Yii::setAlias('@apply-theme', __DIR__);

            // merge app config
            $this->applyConfig($app);
        }

        /** @inheritdoc */
        private function applyConfig($app)
        {
            $config = include(__DIR__ . '/config.php');
            if (is_array($config) && !empty($config)) {
                foreach ($config as $item => $value) {
                    if (isset($app->{$item})) {
                        if (!is_array($app->{$item})) {
                            $app->{$item} = $value;
                        } else {
                            $app->{$item} = array_merge_recursive_distinct($app->{$item}, $value);
                        }
                    }
                }
            }
        }
    }