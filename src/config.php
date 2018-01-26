<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-01
    | TIME   : 11:55 PM
    */

    $viewsDir = __DIR__ . '/views';
    return [
        'layoutPath' => "{$viewsDir}/layouts",
        'components' => [
            'applyTheme' => ['class' => "Ebooking\\Themes\\Apply\\Apply"],
            'view'       => [
                'theme' => [
                    'pathMap' => [
                        '@app/views' => $viewsDir
                    ],
                ],
            ],
            'errorHandler' => [
                'errorView' => __DIR__ . '/views/errors/404.php'
            ],
        ],
    ];